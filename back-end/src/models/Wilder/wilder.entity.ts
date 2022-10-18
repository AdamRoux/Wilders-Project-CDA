import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import School from '../School/school.entity';
import Skill from '../Skill/skill.entity';

@Entity()
@ObjectType()
export default class Wilder {
  constructor(
    firstName: string,
    lastName: string,
    school?: School,
    skills?: Skill[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (school) this.school = school;
    if (skills) this.skills = skills;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @ManyToOne(() => School, (school) => school.wilders, { eager: true })
  @Field(() => School, { nullable: true })
  school: School;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  @Field(() => [Skill], { nullable: true })
  skills: Skill[];

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
