import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { BookingStatus } from "@prisma/client";
import { User } from "../users/user.entity";

registerEnumType(BookingStatus, {
  name: "BookingStatus",
});

@ObjectType()
export class Booking {
  @Field()
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

  @Field()
  reservationAt!: Date;

  @Field()
  carModel!: string;

  @Field(() => Int, { nullable: true })
  batteryLevel?: number;

  @Field(() => Int, { nullable: true })
  kilometresLeft?: number;

  @Field({ nullable: true })
  chargingTimeEstimate?: string;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  vehicleImageUrl?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
