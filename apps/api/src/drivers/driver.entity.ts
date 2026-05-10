import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../users/user.entity";

@ObjectType()
export class DriverProfile {
  @Field()
  id!: string;

  @Field()
  userId!: string;

  @Field({ nullable: true })
  truckName?: string;

  @Field({ nullable: true })
  plateNumber?: string;

  @Field()
  isAvailable!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class Driver extends User {
  @Field(() => DriverProfile, { nullable: true })
  driverProfile?: DriverProfile;
}
