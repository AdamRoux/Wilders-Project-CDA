import { Repository } from "typeorm/repository/Repository";
import School from "./school.entity";
import { getSchoolRepository } from "../../database/utils";

export default class SchoolRepository extends School {

  private static repository: Repository<School>;

  // get repository
  static async initializeRepository(): Promise<void> {
    this.repository =  await getSchoolRepository();
  }


  static async clearRepository(): Promise<void> {
    await this.repository.clear();
  }


  static async  initializeSchools(): Promise<void> {
    await this.clearRepository();
    const cities = [ "Paris", "Marseille", "Nantes", "Strasbourg", "Lyon"];
    for (const city of cities) {
      const newSchool = this.repository.create({
        schoolName: city,
      });
      await this.repository.save(newSchool);
    }
    
  }

  static async  getSchoolByName(name: string): Promise<School | null> {
    return this.repository.findOneBy({ schoolName: name });
  }

  static async  getSchools(): Promise<School[]> {
  
    return this.repository.find();
  }
  
  static async  getSchoolById(id: string): Promise<School | null> {
   
    return this.repository.findOneBy({ id: id });
  }
}