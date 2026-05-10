import { Query, Resolver } from "@nestjs/graphql";
import { PricingService } from "./pricing.service";
import { PricingPlan } from "./pricing-plan.entity";

@Resolver(() => PricingPlan)
export class PricingResolver {
  constructor(private readonly pricing: PricingService) {}

  @Query(() => [PricingPlan])
  pricingPlans() {
    return this.pricing.listPlans();
  }
}
