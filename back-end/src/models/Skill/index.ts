import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Wilder from "../Wilder";

const EntitySchema = require("typeorm").EntitySchema;


@Entity()
export default class Skill {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  skillName: string;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
  
}