import { Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(input: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: UserRole;
  }) {
    return this.prisma.user.create({
      data: input
    });
  }

  list(args: Prisma.UserFindManyArgs = {}) {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      ...args
    });
  }
}
