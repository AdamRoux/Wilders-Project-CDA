import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { getDatabase } from './database/utils';
import AppUserRepository from './models/AppUser/repository';
import SessionRepository from './models/AppUser/session.repository';
import SchoolRepository from './models/School/repository';
import SkillRepository from './models/Skill/repository';
import WilderRepository from './models/Wilder/repository';
import appUserResolver from './resolvers/AppUser/appUser.resolver';
import SchoolResolver from './resolvers/School/school.resolver';
import WilderResolver from './resolvers/Wilder/wilder.resolver';

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WilderResolver, SchoolResolver, appUserResolver],
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
    await AppUserRepository.initializeRepository();
    await SessionRepository.initializeRepository();

    await SchoolRepository.initializeSchools();
    await SkillRepository.initializeSkills();
    await WilderRepository.initializeWilders();

    await getDatabase();

    console.log(`🚀  Server ready at ${url}`);
  });
};

startServer();
