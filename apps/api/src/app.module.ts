import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthModule } from "./auth/auth.module";
import { BookingsModule } from "./bookings/bookings.module";
import { DriversModule } from "./drivers/drivers.module";
import { HealthModule } from "./health/health.module";
import { PricingModule } from "./pricing/pricing.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatError: (error: any) => {
        // Very defensive formatting to avoid toJSON issues
        const formattedError = {
          message: error.message || 'Internal server error',
          extensions: {
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            status: error.extensions?.status || 500,
          }
        };
        return formattedError;
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads"),
      serveRoot: "/uploads",
    }),
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
