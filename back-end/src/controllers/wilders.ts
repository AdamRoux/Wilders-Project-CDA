import { getWilders, createWilder, updateWilder, deleteWilder, addSkillToWilder } from "../models/Wilder/manager";
import {Request, Response} from "express"

const get = async (req: Request, res: Response): Promise<void> => {
  const wilders = await getWilders();
  res.json(wilders);
};

const post = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    res.status(400).json({ error: "First name and last name are mandatory." });
  } else {
    const newWilder = await createWilder(firstName, lastName, req.params.id);
    res.status(201).json(newWilder);
  }
};

const put = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(400).json({ error: "First name and last name are mandatory." });
  } else {
    try {
      const updatedWilder = await updateWilder(id, firstName, lastName);
      res.json(updatedWilder);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
};

const del = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteWilder(id);
    res.json({ message: `Wilder ${id} has been successfully removed.` });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const addSkill = async (req: Request, res: Response): Promise<void> => {
  const { id: wilderId } = req.params;
  const { skillId } = req.body;

  if (!skillId) {
    res.status(400).json({ error: "Skill ID is mandatory." });
  } else {
    try {
      const updatedWilder = await addSkillToWilder(wilderId, skillId);
      res.json(updatedWilder);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
};

export {
  get,
  post,
  put,
  del,
  addSkill,
};
