import { Field, InputType, Int } from "@nestjs/graphql";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from "class-validator";

@InputType()
export class CreateBookingDto {
  @Field()
  @IsString()
  rechargeAddress!: string;

  @Field()
  @IsDateString()
  reservationAt!: string;

  @Field()
  @IsString()
  carModel!: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  batteryLevel?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  kilometresLeft?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  chargingTimeEstimate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comments?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isEmergency?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  vehicleImageBase64?: string;
}
