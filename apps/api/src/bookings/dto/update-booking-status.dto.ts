import { Field, InputType } from "@nestjs/graphql";
import { BookingStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

@InputType()
export class UpdateBookingStatusDto {
  @Field(() => BookingStatus)
  @IsEnum(BookingStatus)
  status!: BookingStatus;
}
