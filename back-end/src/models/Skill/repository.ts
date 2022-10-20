import { Repository } from 'typeorm';

import { getRepository } from '../../database/utils';
import Skill from './skill.entity';

export default class SkillRepository extends Skill {
  private static repository: Repository<Skill>;

  // get repository
  static async initializeRepository(): Promise<void> {
    this.repository = await getRepository(Skill);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  static async initializeSkills() {
    await this.repository.delete({});
    const skills = [
      "HTML",
      "CSS",
      "React",
      "NodeJS",
      "MongoDB",
      "PHP",
      "JavaScript",
    ];

    for (const skill of skills) {
      await this.repository.save({ skillName: skill });
    }
  }

  static async getSkillByName(name: string): Promise<Skill | null> {
    return this.repository.findOneBy({ skillName: name });
  }

  static async getSkillById(id: string): Promise<Skill | null> {
    return this.repository.findOneBy({ id: id });
  }

  static async getSkills(): Promise<Skill[]> {
    return this.repository.find();
  }
}
