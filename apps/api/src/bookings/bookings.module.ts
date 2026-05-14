import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsResolver } from "./bookings.resolver";
import { PricingModule } from "../pricing/pricing.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PricingModule, PrismaModule],
  providers: [BookingsService, BookingsResolver],
  exports: [BookingsService]
})
export class BookingsModule {}
