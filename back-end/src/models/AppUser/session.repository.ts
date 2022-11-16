import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import AppUser from './appUser.entity';
import AppUserSession from './session.entity';

export default class SessionRepository extends AppUserSession {
  // DB operations
  private static repository: Repository<AppUserSession>;

  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(AppUserSession);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  // Repository operations
  static async createSession(user: AppUser): Promise<AppUserSession> {
    const session = new AppUserSession(user);
    return await this.repository.save(session);
  }

  static async findById(id: string): Promise<AppUserSession | null> {
    return await this.repository.findOneBy({ id });
  }
}
