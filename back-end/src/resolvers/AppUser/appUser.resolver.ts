import { ExpressContext } from 'apollo-server-express';
import { parse } from 'cookie';
import { Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { GlobalContext } from '../..';
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
    @Ctx() context: GlobalContext
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

  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }

  static getSessionIdInCookie = (ctx: ExpressContext): string | undefined => {
    const rawCookies = ctx.req.headers.cookie;
    if (!rawCookies) {
      return undefined;
    }
    const parsedCookies = parse(rawCookies);
    return parsedCookies.sessionId;
  };
}
