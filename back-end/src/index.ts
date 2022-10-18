import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { getDatabase } from './database/utils';
import SchoolRepository from './models/School/repository';
import SkillRepository from './models/Skill/repository';
import WilderRepository from './models/Wilder/repository';
import SchoolResolver from './resolvers/school.resolver';
import WilderResolver from './resolvers/wilder.resolver';

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello world from Express!");
});

// const WILDERS_PATH = "/wilders";
// app.get(WILDERS_PATH, wildersControllers.get);
// app.post(WILDERS_PATH, wildersControllers.post);
// app.put(`${WILDERS_PATH}/:id`, wildersControllers.put);
// app.delete(`${WILDERS_PATH}/:id`, wildersControllers.del);
// app.post(`${WILDERS_PATH}/:id/skills`, wildersControllers.addSkill);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WilderResolver, SchoolResolver],
    }),
    csrfPrevention: true,
    cache: "bounded",
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
     **/
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  // The `listen` method launches a web server.
  await server.listen().then(async ({ url }) => {
    await SkillRepository.initializeRepository();
    await SchoolRepository.initializeRepository();
    await WilderRepository.initializeRepository();

    await SchoolRepository.initializeSchools();
    await SkillRepository.initializeSkills();
    await WilderRepository.initializeWilders();

    await getDatabase();

    console.log(`🚀  Server ready at ${url}`);
  });
};

startServer();
