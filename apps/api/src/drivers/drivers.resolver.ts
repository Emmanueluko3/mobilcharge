import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { DriversService } from "./drivers.service";
import { Driver } from "./driver.entity";

@UseGuards(GqlAuthGuard)
@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly drivers: DriversService) {}

  @Query(() => [Driver])
  availableDrivers() {
    return this.drivers.listAvailable();
  }
}
