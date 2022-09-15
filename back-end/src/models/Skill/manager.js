const { getSkillRepository } = require("../../database/utils");

const initializeSkills = async () => {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  ["HTML", "CSS", "React", "NodeJS", "MongoDB", "PHP", "JavaScript"].forEach(
    (skill) => {
      skillRepository.save({ skillName: skill });
    }
  );
};

async function getSkillByName(name) {
  const skillRepository = await getSkillRepository();
  return skillRepository.findOneBy({ skillName: name });
}

module.exports = { initializeSkills, getSkillByName };
