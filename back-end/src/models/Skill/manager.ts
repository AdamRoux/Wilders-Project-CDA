import { getSkillRepository } from "../../database/utils";

export const initializeSkills = async () => {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  ["HTML", "CSS", "React", "NodeJS", "MongoDB", "PHP", "JavaScript"].forEach(
    (skill) => {
      skillRepository.save({ skillName: skill });
    }
  );
};

export async function getSkillByName(name: string) {
  const skillRepository = await getSkillRepository();
  return skillRepository.findOneBy({ skillName: name });
}

export  async function getSkills() {
  const skillRepository = await getSkillRepository();
  return skillRepository.find();
}

// export = { initializeSkills, getSkillByName, getSkills, };
