import { Args, Mutation, Resolver } from 'type-graphql';

import AppUser from '../models/AppUser/appUser.entity';
import AppUserRepository from '../models/AppUser/repository';
import { SignInArgs, SignUpArgs } from './appUser.input';

@Resolver(AppUser)
export default class AppUserResolver {
  @Mutation(() => AppUser)
  signUp(
    @Args() { firstName, lastName, emailAddress, password }: SignUpArgs
  ): Promise<AppUser> {
    return AppUserRepository.createAppUser(
      firstName,
      lastName,
      emailAddress,
      password
    );
  }

  @Mutation(() => AppUser)
  signIn(@Args() { emailAddress, password }: SignInArgs): Promise<AppUser> {
    return AppUserRepository.signIn(emailAddress, password);
  }
}
