import { getSchools } from "../models/School/manager";
import { Request, Response } from "express";

const get = async (req: Request , res: Response) => {
  const schools = await getSchools();
  res.status(200).json(schools);
};

export default {
  get,
};
