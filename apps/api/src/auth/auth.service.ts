import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { randomInt } from "crypto";
import { saveBase64Image } from "../common/utils/base64-upload.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // ─── GraphQL Mutations ────────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Email already exists");
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    
    let profileImage = null;
    if (dto.profileImageBase64) {
      profileImage = saveBase64Image(dto.profileImageBase64, "uploads/profiles");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profileImageBase64, password, ...restDto } = dto;
    const user = await this.users.create({ 
      ...restDto, 
      passwordHash, 
      role: "USER" 
    });

    if (profileImage) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { profileImage },
      });
    }

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return this.issueTokens(user);
  }

  // ─── Password Reset (GraphQL) ─────────────────────────────────────────────────

  /** Step 1 – generate a 6-digit OTP and store it (expires in 15 min) */
  async requestPasswordReset(email: string) {
    const user = await this.users.findByEmail(email);
    if (!user) {
      // Return success regardless to prevent user enumeration attacks
      return { message: "If that email is registered, an OTP has been sent." };
    }

    // Invalidate any existing OTPs for this email
    await this.prisma.otp.deleteMany({ where: { email } });

    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await this.prisma.otp.create({ data: { email, code, expiresAt } });

    // TODO: Replace console.log with a real mail service when one is wired up
    console.log(`[OTP] Password reset code for ${email}: ${code}`);

    return { message: "If that email is registered, an OTP has been sent." };
  }

  /** Step 2 – verify the OTP code */
  async verifyResetCode(email: string, code: string) {
    const otp = await this.prisma.otp.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      throw new BadRequestException("Invalid or expired OTP code");
    }

    if (otp.expiresAt < new Date()) {
      await this.prisma.otp.delete({ where: { id: otp.id } });
      throw new BadRequestException("OTP code has expired. Please request a new one.");
    }

    return { message: "OTP verified successfully. You may now reset your password." };
  }

  /** Step 3 – set the new password (re-validates OTP) */
  async resetPassword(email: string, code: string, newPassword: string) {
    const otp = await this.prisma.otp.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });

    if (!otp || otp.expiresAt < new Date()) {
      throw new BadRequestException("Invalid or expired OTP code. Please start the reset process again.");
    }

    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (newPassword.length < 6) {
      throw new BadRequestException("Password must be at least 6 characters");
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Invalidate OTP after successful use
    await this.prisma.otp.deleteMany({ where: { email } });

    return { detail: "Password has been reset successfully. You can now log in with your new password." };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private issueTokens(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      user,
      access: this.jwt.sign(payload),
      refresh: this.jwt.sign(payload, { expiresIn: "30d" }),
    };
  }
}
