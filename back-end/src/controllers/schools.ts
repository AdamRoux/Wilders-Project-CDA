
import { Request, Response } from "express";
import SchoolRepository from "../models/School/repository";


const get = async (req: Request , res: Response) => {
  const schools = await SchoolRepository.getSchools();
  res.status(200).json(schools);
};

export default {
  get,
};
