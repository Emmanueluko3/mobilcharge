import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.users.create({
      ...dto,
      passwordHash,
      role: "USER"
    });

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.issueTokens(user);
  }

  private issueTokens(user: { id: string; email: string; role: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return {
      user,
      accessToken: this.jwt.sign(payload),
      refreshToken: this.jwt.sign(payload, { expiresIn: "30d" })
    };
  }
}
