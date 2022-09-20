import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import School from "../School";
import Skill from "../Skill";

const EntitySchema = require("typeorm").EntitySchema;

@Entity()
export default class Wilder {
  constructor(firstName: string, lastName: string, school?: School, skills?: Skill[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    if(school) this.school = school;
    if(skills) this.skills = skills;
  }


  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => School, (school) => school.wilders, {eager: true})
  school: School;

  @ManyToMany(() => Skill,  {eager: true})
  @JoinTable()
  skills: Skill[];
  
}