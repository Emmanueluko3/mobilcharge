import { ObjectType, Field, ID, Float, Int } from "@nestjs/graphql";

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: string;

  @Field()
  brand!: string;

  @Field()
  model!: string;

  @Field(() => Int)
  year!: number;

  @Field(() => Float)
  batteryCapacity!: number;

  @Field()
  portType!: string;

  @Field({ nullable: true })
  plateNumber?: string;

  @Field()
  userId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
