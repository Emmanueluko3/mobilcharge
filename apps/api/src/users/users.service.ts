import { Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { saveBase64Image } from "../common/utils/base64-upload.util";

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
    return this.prisma.user.create({ data: input });
  }

  list(args: Prisma.UserFindManyArgs = {}) {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      ...args,
    });
  }

  updateProfile(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      profileImageBase64?: string;
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...data };
    
    if (updateData.profileImageBase64) {
      const profileImage = saveBase64Image(updateData.profileImageBase64, "uploads/profiles");
      if (profileImage) {
        updateData.profileImage = profileImage;
      }
    }
    delete updateData.profileImageBase64;

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  updatePassword(id: string, passwordHash: string) {
    return this.prisma.user.update({ where: { id }, data: { passwordHash } });
  }
}
