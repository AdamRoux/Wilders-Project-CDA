import { Repository } from "typeorm";
import Skill from "./skill.entity";
import { getRepository } from "../../database/utils";

export default class SkillRepository extends Skill {
    private static repository: Repository<Skill>;

  // get repository
  static async initializeRepository(): Promise<void> {
    this.repository =  await getRepository(Skill);
  }


  static async clearRepository(): Promise<void> {
    await this.repository.clear();
  }


static async initializeSkills() {
  
  await this.repository.clear();
  const skills = ["HTML", "CSS", "React", "NodeJS", "MongoDB", "PHP", "JavaScript"];
  
  for (const skill of skills) {
    
    await this.repository.save({ skillName: skill });
  }
};

static async getSkillByName(name: string): Promise<Skill | null> {
  return this.repository.findOneBy({ skillName: name });
}

static async getSkillById(id: string): Promise<Skill | null> {
  return this.repository.findOneBy({ id: id });
}


static  async  getSkills(): Promise<Skill[]> {
  return this.repository.find();
}
}