import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Repository } from "typeorm";
import Wilder from "../Wilder/wilder.entity";



@Entity()
export default class Skill {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  skillName: string;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];

  

  
}