import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { PasswordResetRequestDto, VerifyResetCodeDto, ResetPasswordDto } from "./dto/password-reset.dto";
import { AuthResponse } from "./auth.entity";
import { User } from "../users/user.entity";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { JwtPayload } from "./jwt.strategy";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
  ) {}

  @Mutation(() => AuthResponse)
  register(@Args("input") dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Mutation(() => AuthResponse)
  login(@Args("input") dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Mutation(() => String)
  async requestPasswordReset(@Args("input") dto: PasswordResetRequestDto) {
    const result = await this.auth.requestPasswordReset(dto.email);
    return result.message;
  }

  @Mutation(() => String)
  async verifyResetCode(@Args("input") dto: VerifyResetCodeDto) {
    const result = await this.auth.verifyResetCode(dto.email, dto.code);
    return result.message;
  }

  @Mutation(() => String)
  async resetPassword(@Args("input") dto: ResetPasswordDto) {
    const result = await this.auth.resetPassword(dto.email, dto.code, dto.password);
    return result.detail;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() payload: JwtPayload) {
    // Fetch the full database record so all fields — including role — are populated.
    // This prevents the `is_superuser` resolver from receiving a bare JWT payload object.
    return this.users.findById(payload.id);
  }
}
