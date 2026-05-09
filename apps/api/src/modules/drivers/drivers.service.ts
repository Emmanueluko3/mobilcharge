import { Injectable } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}

  listAvailable() {
    return this.prisma.user.findMany({
      where: {
        role: UserRole.DRIVER,
        driverProfile: {
          isAvailable: true
        }
      },
      include: {
        driverProfile: true
      },
      orderBy: { firstName: "asc" }
    });
  }
}
