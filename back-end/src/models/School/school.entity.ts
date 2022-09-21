import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, Repository } from "typeorm";
import { getSchoolRepository } from "../../database/utils";
import Wilder from "../Wilder/wilder.entity";
import WilderRepository from "../Wilder/repository";

@Entity()
export default class School {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({unique: true})
  schoolName: string;

  @OneToMany(() => Wilder, (wilder) => wilder.school)
  wilders: Wilder[];  


}


