import { ExpressContext } from 'apollo-server-express';
import { Args, Ctx, Mutation, Resolver } from 'type-graphql';

import AppUser from '../../models/AppUser/appUser.entity';
import AppUserRepository from '../../models/AppUser/repository';
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
  async signIn(
    @Args() { emailAddress, password }: SignInArgs,
    @Ctx() context: ExpressContext
  ): Promise<AppUser> {
    const { appUser, session } = await AppUserRepository.signIn(
      emailAddress,
      password
    );
    context.res.cookie("sessionId", session.id, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return appUser;
  }
}
