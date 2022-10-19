import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import SchoolRepository from '../School/repository';
import School from '../School/school.entity';
import SkillRepository from '../Skill/repository';
import Skill from '../Skill/skill.entity';
import Wilder from './wilder.entity';

export default class WilderRepository extends Wilder {
  private static repository: Repository<Wilder>;

  // get repository
  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(Wilder);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.clear();
  }

  static async initializeWilders() {
    this.clearRepository();
    const lyonSchool = (await SchoolRepository.getSchoolByName(
      "Lyon"
    )) as School;
    const js = (await SkillRepository.getSkillByName("JavaScript")) as Skill;
    const node = (await SkillRepository.getSkillByName("NodeJS")) as Skill;
    const html = (await SkillRepository.getSkillByName("HTML")) as Skill;

    const vianney = new Wilder("Vianney", "Accart", lyonSchool, [
      js,
      node,
      html,
    ]);
    const adam = new Wilder("Adam", "Roux", lyonSchool, [js, node, html]);

    await this.repository.save([vianney, adam]);
  }

  static async getWilders(): Promise<Wilder[]> {
    return this.repository.find();
  }

  static async createWilder(
    firstName: string,
    lastName: string,
    schoolId: string
  ): Promise<Wilder> {
    const school = await SchoolRepository.getSchoolById(schoolId);
    console.log(school);
    if (!school) throw Error("No existing school matching ID.");
    const newWilder = this.repository.create({
      firstName,
      lastName,
      school,
    });
    await this.repository.save(newWilder);
    return newWilder;
  }

  static async updateWilder(
    id: string,
    firstName: string,
    lastName: string
  ): Promise<Wilder> {
    const existingWilder = await this.repository.findOneBy({ id });
    if (!existingWilder) {
      throw Error("No existing Wilder matching ID.");
    }
    return this.repository.save({
      id,
      firstName,
      lastName,
    });
  }

  static async deleteWilder(id: string): Promise<Wilder> {
    const existingWilder = await this.repository.findOneBy({ id });
    if (!existingWilder) {
      throw Error("No existing Wilder matching ID.");
    }
    await this.repository.remove(existingWilder);
    // resetting ID because existingWilder loses ID after calling remove
    existingWilder.id = id;
    return existingWilder;
  }

  static async addSkillToWilder(wilderId: string, skillId: string) {
    const wilder = await this.repository.findOneBy({ id: wilderId });
    if (!wilder) {
      throw Error("No existing Wilder matching ID.");
    }
    const skill = await SkillRepository.getSkillById(skillId);
    if (!skill) {
      throw Error("No existing skill matching ID.");
    }
    wilder.skills = [...wilder.skills, skill];
    return this.repository.save(wilder);
  }
}
