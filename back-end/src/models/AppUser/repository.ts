import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import AppUser from './appUser.entity';
import AppUserSession from './session.entity';
import SessionRepository from './session.repository';

export const INVALID_CREDENTIALS_ERROR_MESSAGE = "Invalid credentials.";

export default class AppUserRepository extends AppUser {
  // DB operations
  private static repository: Repository<AppUser>;

  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(AppUser);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  // Repository methods
  static async createAppUser(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ): Promise<AppUser> {
    const appUser = new AppUser(
      firstName,
      lastName,
      emailAddress,
      hashSync(password)
    );
    return await this.repository.save(appUser);
  }

  static async signIn(
    emailAddress: string,
    password: string
  ): Promise<{ appUser: AppUser; session: AppUserSession }> {
    const appUser = await this.repository.findOneBy({ emailAddress });
    if (!appUser || !compareSync(password, appUser.hashedPassword)) {
      throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
    }
    const session = await SessionRepository.createSession(appUser);
    return { appUser, session };
  }

  static async signOut(user: AppUser): Promise<void> {
    // delete session linked to user
    // return user
  }

  static async findUserBySessionID(sessionId: string): Promise<AppUser> {
    const session = await SessionRepository.findById(sessionId);
    if (!session) {
      throw new Error("Utilisateur non connecté.");
    }
    return session.user;
  }
}
