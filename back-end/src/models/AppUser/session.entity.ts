import { randomBytes } from 'crypto';
import { BeforeInsert, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import AppUser from './appUser.entity';

@Entity()
export default class AppUserSession {
  constructor(user: AppUser) {
    this.user = user;
  }

  @PrimaryColumn("varchar", { length: 32 })
  id: string;

  @BeforeInsert()
  setId(): void {
    this.id = randomBytes(16).toString("hex");
  }

  @ManyToOne(() => AppUser, { eager: true })
  user: AppUser;
}
