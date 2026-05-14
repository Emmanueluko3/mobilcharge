import { Field, InputType, Int, Float } from "@nestjs/graphql";
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

  @Field(() => Float)
  @IsNumber()
  originLat!: number;

  @Field(() => Float)
  @IsNumber()
  originLng!: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  destLat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  destLng?: number;

  @Field()
  @IsDateString()
  reservationAt!: string;

  @Field()
  @IsString()
  carModel!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  vehicleId?: string;

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
  @Max(100)
  batteryTarget?: number;

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
