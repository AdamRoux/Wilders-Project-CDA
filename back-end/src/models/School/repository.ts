import { Repository } from 'typeorm/repository/Repository';

import { getRepository } from '../../database/utils';
import WilderRepository from '../Wilder/repository';
import School from './school.entity';

export default class SchoolRepository extends School {
  private static repository: Repository<School>;

  // get repository
  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(School);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  static async initializeSchools(): Promise<void> {
    await WilderRepository.clearRepository();
    await this.clearRepository();
    const cities = ["Paris", "Marseille", "Nantes", "Strasbourg", "Lyon"];
    for (const city of cities) {
      await this.repository.save({ schoolName: city });
    }
  }

  static async getSchoolByName(name: string): Promise<School | null> {
    return this.repository.findOneBy({ schoolName: name });
  }

  static async getSchools(): Promise<School[]> {
    return this.repository.find();
  }

  static async getSchoolById(id: string): Promise<School | null> {
    return this.repository.findOneBy({ id: id });
  }
}
