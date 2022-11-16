import { IsEmail, Matches, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

const passwordRegexp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

@ArgsType()
class SignUpArgs {
  @Field()
  @MinLength(1)
  firstName: string;

  @Field()
  @MinLength(1)
  lastName: string;

  @Field()
  @MinLength(1)
  @IsEmail()
  emailAddress: string;

  @Field()
  @Matches(passwordRegexp, {
    message:
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une miniscule, un chiffre et un caractère spécial",
  })
  password: string;
}

@ArgsType()
class SignInArgs {
  @Field()
  @MinLength(1)
  @IsEmail()
  emailAddress: string;

  @Field()
  password: string;
}

export { SignUpArgs, SignInArgs };
