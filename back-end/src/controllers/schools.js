const { getSchools } = require("../models/School/manager.js");

const get = async (req, res) => {
  const schools = await getSchools();
  res.status(200).json(schools);
};

module.exports = {
  get,
};
