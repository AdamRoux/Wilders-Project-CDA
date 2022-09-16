const { getSkills } = require("../models/Skill/manager.js");

const get = async (req, res) => {
  const skills = await getSkills();
  res.json(skills);
};

module.exports = {
  get,
};
