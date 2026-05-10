import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;

  @Field()
  @IsString()
  firstName!: string;

  @Field()
  @IsString()
  lastName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profileImageBase64?: string;
}
