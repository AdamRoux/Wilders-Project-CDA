import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import AppUser from './appUser.entity';

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
  ): Promise<AppUser> {
    const appUser = await this.repository.findOneBy({ emailAddress });
    console.log(appUser);
    if (!appUser || !compareSync(password, appUser.hashedPassword)) {
      throw new Error("Invalid credentials");
    }
    return appUser;
  }
}
