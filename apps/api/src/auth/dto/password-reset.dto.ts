import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class PasswordResetRequestDto {
  @Field()
  @IsEmail()
  email!: string;
}

@InputType()
export class VerifyResetCodeDto {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  code!: string;
}

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  code!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;

  @Field()
  @IsString()
  confirm_password!: string;
}
