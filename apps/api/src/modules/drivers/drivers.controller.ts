import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DriversService } from "./drivers.service";

@UseGuards(JwtAuthGuard)
@Controller("drivers")
export class DriversController {
  constructor(private readonly drivers: DriversService) {}

  @Get("available")
  listAvailable() {
    return this.drivers.listAvailable();
  }
}
