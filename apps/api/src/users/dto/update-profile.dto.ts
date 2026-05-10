import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class UpdateProfileDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profileImageBase64?: string;
}

@InputType()
export class UpdatePasswordDto {
  @Field()
  @IsString()
  @MinLength(6)
  oldPassword!: string;

  @Field()
  @IsString()
  @MinLength(6)
  newPassword!: string;
}
