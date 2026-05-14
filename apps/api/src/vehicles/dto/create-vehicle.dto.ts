import { InputType, Field, Float, Int } from "@nestjs/graphql";
import { IsString, IsInt, IsNumber, IsOptional } from "class-validator";

@InputType()
export class CreateVehicleDto {
  @Field()
  @IsString()
  brand!: string;

  @Field()
  @IsString()
  model!: string;

  @Field(() => Int)
  @IsInt()
  year!: number;

  @Field(() => Float)
  @IsNumber()
  batteryCapacity!: number;

  @Field()
  @IsString()
  portType!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  plateNumber?: string;
}
