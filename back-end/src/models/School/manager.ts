import School from ".";

import { getSchoolRepository, getWilderRepository } from "../../database/utils";

export async function initializeSchools() {
  const schoolRepository = await getSchoolRepository();
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  await schoolRepository.clear();
  ["Lyon", "Paris", "Marseille", "Nantes", "Strasbourg"].forEach((school) => {
    schoolRepository.save({ schoolName: school });
  });
}

export async function getSchoolByName(name: string): Promise<School | null> {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.findOneBy({ schoolName: name });
}

export async function getSchools() {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.find();
}

export async function getSchoolById(id: string) {
  const schoolRepository = await getSchoolRepository();
  return schoolRepository.findOneBy({ id: id });
}

// export = {
//   initializeSchools,
//   getSchoolByName,
//   getSchools,
//   getSchoolById,
// };
