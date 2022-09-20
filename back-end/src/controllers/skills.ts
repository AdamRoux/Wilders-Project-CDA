import { getSkills } from "../models/Skill/manager";
import { Request, Response } from "express";
const get = async (req: Request, res: Response) => {
  const skills = await getSkills();
  res.json(skills);
};

export default {
  get,
};
