const {
  getWilderRepository,
  getSkillRepository,
} = require("../../database/utils");
const { getSchoolByName } = require("../School/manager");
const { getSkillByName } = require("../Skill/manager");
const { getSchoolById } = require("../School/manager");

async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  const lyonSchool = await getSchoolByName("Lyon");
  const js = await getSkillByName("JavaScript");
  const node = await getSkillByName("NodeJS");
  const html = await getSkillByName("HTML");
  await wilderRepository.save({
    firstName: "Vianney",
    lastName: "Accart",
    school: lyonSchool,
    skills: [js, html, node],
  });
  await wilderRepository.save({
    firstName: "Adam",
    lastName: "Roux",
    school: lyonSchool,
    skills: [js, node, html],
  });
  await wilderRepository.save({
    firstName: "Ario",
    lastName: "Ngu",
    school: lyonSchool,
    skills: [html],
  });
}

async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

async function createWilder(firstName, lastName, schoolId) {
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

async function updateWilder(id, firstName, lastName) {
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

const deleteWilder = async (id) => {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.remove(existingWilder);
};

const addSkillToWilder = async (wilderId, skillId) => {
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

module.exports = {
  initializeWilders,
  getWilders,
  createWilder,
  updateWilder,
  deleteWilder,
  addSkillToWilder,
};
