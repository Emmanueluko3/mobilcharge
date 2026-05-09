import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  rechargeAddress!: string;

  @IsDateString()
  reservationAt!: string;

  @IsString()
  carModel!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  batteryLevel?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  kilometresLeft?: number;

  @IsOptional()
  @IsString()
  chargingTimeEstimate?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsBoolean()
  isEmergency?: boolean;
}
