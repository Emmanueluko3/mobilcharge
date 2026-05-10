import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { mkdirSync } from "fs";
import { join } from "path";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";

async function bootstrap() {
  // Ensure uploads directory exists for profile images
  mkdirSync(join(process.cwd(), "uploads", "profiles"), { recursive: true });

  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.get<string>("CORS_ORIGIN")?.split(",") ?? true,
    credentials: true,
  });

  // Increase payload size limit to support Base64 image uploads
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(config.get<number>("PORT") ?? 4000);
}

void bootstrap();
