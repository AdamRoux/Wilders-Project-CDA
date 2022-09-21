import express from "express";
import * as wildersControllers from "./controllers/wilders";
import skillsControllers from "./controllers/skills";
import schoolControllers from "./controllers/schools";
import { getDatabase } from "./database/utils";
import WilderRepository from "./models/Wilder/repository";
import SkillRepository from "./models/Skill/repository";
import SchoolRepository from "./models/School/repository";

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello world from Express!");
});

const WILDERS_PATH = "/wilders";
app.get(WILDERS_PATH, wildersControllers.get);
app.post(WILDERS_PATH, wildersControllers.post);
app.put(`${WILDERS_PATH}/:id`, wildersControllers.put);
app.delete(`${WILDERS_PATH}/:id`, wildersControllers.del);
app.post(`${WILDERS_PATH}/:id/skills`, wildersControllers.addSkill);

const SKILLS_PATH = "/skills";
app.get(SKILLS_PATH, skillsControllers.get);

const SCHOOL_PATH = "/schools";
app.get(SCHOOL_PATH, schoolControllers.get);

const PORT = 4000;

async function start() {
  await SkillRepository.initializeRepository();
  await SchoolRepository.initializeRepository();
  await WilderRepository.initializeRepository();
  
  await SchoolRepository.initializeSchools();
  await SkillRepository.initializeSkills();
  await WilderRepository.initializeWilders();

  await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();
