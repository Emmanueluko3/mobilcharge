import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { Vehicle } from "./vehicle.entity";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { AuthUser } from "@mobilcharge/types";

@Resolver(() => Vehicle)
@UseGuards(GqlAuthGuard)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Mutation(() => Vehicle)
  createVehicle(
    @CurrentUser() user: AuthUser,
    @Args("input") input: CreateVehicleDto,
  ) {
    return this.vehiclesService.create(user.id, input);
  }

  @Query(() => [Vehicle], { name: "myVehicles" })
  findAll(@CurrentUser() user: AuthUser) {
    return this.vehiclesService.findAll(user.id);
  }

  @Query(() => Vehicle, { name: "vehicle" })
  findOne(
    @CurrentUser() user: AuthUser,
    @Args("id", { type: () => ID }) id: string,
  ) {
    return this.vehiclesService.findOne(id, user.id);
  }

  @Mutation(() => Vehicle)
  removeVehicle(
    @CurrentUser() user: AuthUser,
    @Args("id", { type: () => ID }) id: string,
  ) {
    return this.vehiclesService.remove(id, user.id);
  }
}
