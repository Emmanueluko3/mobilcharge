import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  listPlans() {
    return this.prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    });
  }
}
