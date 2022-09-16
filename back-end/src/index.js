const express = require("express");
const wildersControllers = require("./controllers/wilders");
const skillsControllers = require("./controllers/skills");
const schoolControllers = require("./controllers/schools");
const { getDatabase } = require("./database/utils");
const { initializeSchools } = require("./models/School/manager");
const { initializeSkills } = require("./models/Skill/manager");
const { initializeWilders } = require("./models/Wilder/manager");

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
  await initializeSkills();
  await initializeSchools();
  await initializeWilders();
  await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();
