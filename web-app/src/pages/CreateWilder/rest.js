import { query } from "../../services/sendRequest";
import { SCHOOLS_PATH, WILDERS_PATH, SKILLS_PATH } from "../../services/rest";

export async function createWilder(firstName, lastName, school) {
  return query(WILDERS_PATH, "POST", { firstName, lastName, school });
}

export async function getSchools() {
  return fetch(SCHOOLS_PATH).then((response) => response.json());
}

export async function getSkills() {
  return fetch(SKILLS_PATH).then((response) => response.json());
}
