import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  list() {
    return this.users.list({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        profileImage: true,
        createdAt: true
      }
    });
  }
}
