import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field({ nullable: true })
  profileImage?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  /**
   * Computed field: exposed as a GraphQL field via @ResolveField on UsersResolver.
   * Declared here so the schema knows about it.
   */
  @Field(() => Boolean)
  is_superuser!: boolean;
}
