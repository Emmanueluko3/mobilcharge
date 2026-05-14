import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id, userId },
    });

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    return vehicle;
  }

  async remove(id: string, userId: string) {
    const vehicle = await this.findOne(id, userId);
    return this.prisma.vehicle.delete({
      where: { id: vehicle.id },
    });
  }
}
