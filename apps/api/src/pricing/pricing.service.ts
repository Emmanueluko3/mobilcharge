import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  listPlans = () => this.prisma.pricingPlan.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });

  calculatePrice({ distanceKm, batteryCapacity, currentBattery, targetBattery, isEmergency }: {
    distanceKm: number;
    batteryCapacity: number;
    currentBattery: number;
    targetBattery: number;
    isEmergency: boolean;
  }) {
    const energyRequired = Math.max(0, (targetBattery - currentBattery) / 100 * batteryCapacity);
    const costs = { base: isEmergency ? 50 : 20, distance: distanceKm * 1.5, energy: energyRequired * 0.5 };
    const total = Object.values(costs).reduce((a, b) => a + b, 0);

    return {
      total: Math.round(total * 100) / 100,
      breakdown: { ...costs, energyRequired }
    };
  }
}
