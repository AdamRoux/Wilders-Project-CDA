import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToMany, Repository } from "typeorm";
import Wilder from "../Wilder/wilder.entity";


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


