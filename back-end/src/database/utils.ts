import { DataSource, EntityTarget } from "typeorm";
import Wilder from "../models/Wilder/wilder.entity";
import School from "../models/School/school.entity";
import Skill from "../models/Skill/skill.entity";

const dataSource = new DataSource({
  type: "sqlite",
  database: "wildersdb.sqlite",
  synchronize: true,           
  entities: [__dirname + "/../models/**/**.entity.{js,ts}"],
  logging: ["query", "error"],
});

let initialized = false;
async function getDatabase() {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("Successfully connected to database.");
  }
  return dataSource;
}

async function getRepository(entity: EntityTarget<any>) {
  const repository = (await getDatabase()).getRepository(entity);
  return repository;
}

export {
  getDatabase,
  getRepository
};
