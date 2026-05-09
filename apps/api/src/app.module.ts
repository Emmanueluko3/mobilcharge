import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { DriversModule } from "./modules/drivers/drivers.module";
import { HealthModule } from "./modules/health/health.module";
import { PricingModule } from "./modules/pricing/pricing.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BookingsModule,
    DriversModule,
    PricingModule,
    HealthModule
  ]
})
export class AppModule {}
