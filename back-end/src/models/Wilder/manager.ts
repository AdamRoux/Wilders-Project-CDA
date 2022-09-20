import { getWilderRepository, getSkillRepository } from "../../database/utils";
import { getSchoolByName } from "../School/manager";
import { getSkillByName } from "../Skill/manager";
import { getSchoolById } from "../School/manager";
import Wilder from '.';
import School from "../School";
import Skill from "../Skill";

async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  const lyonSchool = await getSchoolByName("Lyon") as School;
  const js = await getSkillByName("JavaScript") as Skill;
  const node = await getSkillByName("NodeJS")as Skill;
  const html = await getSkillByName("HTML")as Skill;

  const vianney = new Wilder("Vianney", "Accart", lyonSchool, [js, node, html]);
  const adam = new Wilder("Adam", "Roux", lyonSchool, [js, node, html]);

  await wilderRepository.save([vianney, adam]);
}

async function getWilders(): Promise<Wilder[]> {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

async function createWilder(firstName: string, lastName: string, schoolId: string ): Promise<Wilder> {
  const wilderRepository = await getWilderRepository();
  const school = await getSchoolById(schoolId);
  console.log(school);
  if (!school) throw Error("No existing school matching ID.");
  const newWilder = wilderRepository.create({
    firstName,
    lastName,
    school,
  });
  await wilderRepository.save(newWilder);
  return newWilder;
}

async function updateWilder(id:string, firstName:string, lastName:string): Promise<Wilder> {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.save({
    id,
    firstName,
    lastName,
  });
}

const deleteWilder = async (id:string) => {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.remove(existingWilder);
};

const addSkillToWilder = async (wilderId:string, skillId:string) => {
  const wilderRepository = await getWilderRepository();
  const skillRepository = await getSkillRepository();
  const wilder = await wilderRepository.findOneBy({ id: wilderId });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  const skill = await skillRepository.findOneBy({ id: skillId });
  if (!skill) {
    throw Error("No existing skill matching ID.");
  }
  wilder.skills = [...wilder.skills, skill];
  return wilderRepository.save(wilder);
};

export {
  initializeWilders,
  getWilders,
  createWilder,
  updateWilder,
  deleteWilder,
  addSkillToWilder,
};
