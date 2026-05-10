import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";
import { join } from "path";

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    MulterModule.register({
      dest: join(process.cwd(), "uploads", "profiles"),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET") ?? "dev-secret",
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRES_IN") ?? "15m",
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
