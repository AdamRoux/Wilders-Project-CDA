import { Request, Response } from "express";

import SkillRepository from "../models/Skill/repository";
const get = async (req: Request, res: Response) => {
  const skills = await SkillRepository.getSkills();
  res.json(skills);
};

export default {
  get,
};
