const {
  getSchoolRepository,
  getWilderRepository,
} = require("../../database/utils");

async function initializeSchools() {
  const schoolRepository = await getSchoolRepository();
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  await schoolRepository.clear();
  ["Lyon", "Paris", "Marseille", "Nantes", "Strasbourg"].forEach((school) => {
    schoolRepository.save({ schoolName: school });
  });
}

async function getSchoolByName(name) {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.findOneBy({ schoolName: name });
}

async function getSchools() {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.find();
}

async function getSchoolById(id) {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.findOneBy({ id: id });
}

module.exports = {
  initializeSchools,
  getSchoolByName,
  getSchools,
  getSchoolById,
};
