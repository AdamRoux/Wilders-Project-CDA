import { Query, Resolver } from 'type-graphql';

import SchoolRepository from '../../models/School/repository';
import School from '../../models/School/school.entity';

@Resolver(School)
export default class SchoolResolver {
  @Query(() => [School])
  schools(): Promise<School[]> {
    return SchoolRepository.getSchools();
  }
}
