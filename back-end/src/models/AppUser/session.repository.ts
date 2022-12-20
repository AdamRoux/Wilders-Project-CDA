import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import AppUser from './appUser.entity';
import Session from './session.entity';

export default class SessionRepository extends Session {
  // DB operations
  static repository: Repository<Session>;

  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(Session);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  // Repository operations
  static async createSession(user: AppUser): Promise<Session> {
    const session = new Session(user);
    return await this.repository.save(session);
  }

  static async findById(id: string): Promise<Session | null> {
    return await this.repository.findOneBy({ id });
  }
}
