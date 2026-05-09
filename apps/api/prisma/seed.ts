import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("MobilCharge123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@mobilcharge.ca" },
    update: {},
    create: {
      email: "admin@mobilcharge.ca",
      firstName: "MobilCharge",
      lastName: "Admin",
      passwordHash,
      role: UserRole.ADMIN
    }
  });

  const driver = await prisma.user.upsert({
    where: { email: "driver@mobilcharge.ca" },
    update: {},
    create: {
      email: "driver@mobilcharge.ca",
      firstName: "Mobile",
      lastName: "Driver",
      passwordHash,
      role: UserRole.DRIVER
    }
  });

  await prisma.driverProfile.upsert({
    where: { userId: driver.id },
    update: {},
    create: {
      userId: driver.id,
      truckName: "MobilCharge Truck 1",
      plateNumber: "MC-001"
    }
  });

  await prisma.pricingPlan.createMany({
    skipDuplicates: true,
    data: [
      {
        key: "visitor",
        name: "VISITOR",
        description: "Electric vehicle owners seeking a quick charging solution",
        priceLabel: "Pay as you go",
        sortOrder: 1,
        features: [
          "Price per 20 min charge (max 25kWh) with membership $32",
          "Price per 20 min charge (max 25kWh) without membership $40",
          "Emergency charge (max 50kWh) $200"
        ]
      },
      {
        key: "membership",
        name: "Membership",
        description: "Electric vehicle owners seeking a recurring charging solution",
        priceLabel: "Membership",
        sortOrder: 2,
        features: [
          "All features of the VISITOR plan",
          "Extended charging time per session",
          "Priority customer support"
        ]
      },
      {
        key: "tailored",
        name: "Tailored Plan",
        description: "Hotels, event centers, fleets, dealerships, businesses, events, etc.",
        priceLabel: "Custom",
        sortOrder: 3,
        features: [
          "Corporate price list",
          "Tailored commercial plans available, invoiced monthly",
          "No membership for corporate clients $0"
        ]
      }
    ]
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
