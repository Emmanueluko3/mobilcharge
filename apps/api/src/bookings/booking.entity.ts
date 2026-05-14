import { Field, Int, Float, ObjectType, registerEnumType, ID } from "@nestjs/graphql";
import { BookingStatus } from "@prisma/client";
import { User } from "../users/user.entity";
import { Vehicle } from "../vehicles/vehicle.entity";

registerEnumType(BookingStatus, {
  name: "BookingStatus",
});

@ObjectType()
export class Booking {
  @Field(() => ID)
  id!: string;

  @Field()
  invoiceId!: string;

  @Field()
  customerId!: string;

  @Field(() => User)
  customer!: User;

  @Field({ nullable: true })
  driverId?: string;

  @Field(() => User, { nullable: true })
  driver?: User;

  @Field(() => BookingStatus)
  status!: BookingStatus;

  @Field()
  isEmergency!: boolean;

  @Field()
  rechargeAddress!: string;

  @Field(() => Float, { nullable: true })
  originLat?: number;

  @Field(() => Float, { nullable: true })
  originLng?: number;

  @Field(() => Float, { nullable: true })
  destLat?: number;

  @Field(() => Float, { nullable: true })
  destLng?: number;

  @Field()
  reservationAt!: Date;

  @Field()
  carModel!: string;

  @Field({ nullable: true })
  vehicleId?: string;

  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;

  @Field(() => Int, { nullable: true })
  batteryLevel?: number;

  @Field(() => Int, { nullable: true })
  batteryTarget?: number;

  @Field(() => Int, { nullable: true })
  kilometresLeft?: number;

  @Field({ nullable: true })
  chargingTimeEstimate?: string;

  @Field(() => Float, { nullable: true })
  estimatedPrice?: number;

  @Field(() => Float, { nullable: true })
  actualPrice?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field(() => Float, { nullable: true })
  duration?: number;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  vehicleImageUrl?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
