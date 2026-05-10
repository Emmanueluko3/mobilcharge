import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PricingPlan {
  @Field()
  id!: string;

  @Field()
  key!: string;

  @Field()
  name!: string;

  @Field()
  get title(): string { return this.name; }

  @Field()
  description!: string;

  @Field()
  priceLabel!: string;

  @Field()
  get price(): string { return this.priceLabel; }

  @Field(() => [String])
  features!: string[];

  @Field(() => Int)
  sortOrder!: number;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
