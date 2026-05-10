import { Query, Resolver, ResolveField, Parent, Mutation, Args } from "@nestjs/graphql";
import { BadRequestException, UseGuards } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtPayload } from "../auth/jwt.strategy";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UserRole } from "@prisma/client";
import { UpdateProfileDto, UpdatePasswordDto } from "./dto/update-profile.dto";

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly users: UsersService) {}

  @Query(() => [User])
  usersList() {
    return this.users.list();
  }

  /**
   * Update the authenticated user's profile (name, phone number).
   * Profile image upload is handled via the REST PATCH /api/auth/update-profile/ endpoint
   * if multipart/form-data is needed, but text fields are updated here via GraphQL.
   */
  @Mutation(() => User)
  updateProfile(
    @CurrentUser() payload: JwtPayload,
    @Args("input") dto: UpdateProfileDto,
  ) {
    return this.users.updateProfile(payload.id, dto);
  }

  /**
   * Change the authenticated user's password after verifying the old one.
   */
  @Mutation(() => User)
  async updatePassword(
    @CurrentUser() payload: JwtPayload,
    @Args("input") dto: UpdatePasswordDto,
  ) {
    const user = await this.users.findById(payload.id);
    if (!user) throw new BadRequestException("User not found");

    const valid = await bcrypt.compare(dto.oldPassword, user.passwordHash);
    if (!valid) throw new BadRequestException("Current password is incorrect");

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.users.updatePassword(payload.id, passwordHash);

    return this.users.findById(payload.id);
  }

  /**
   * Computes is_superuser from the DB row's role field via @ResolveField
   * so it works on plain Prisma objects (not just class instances).
   */
  @ResolveField(() => Boolean)
  is_superuser(@Parent() user: { role: UserRole }): boolean {
    return user.role === UserRole.ADMIN;
  }
}
