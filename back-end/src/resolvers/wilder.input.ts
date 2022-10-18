import { MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class CreateWilderInput {
  @Field()
  @MinLength(1)
  firstName: string;

  @Field()
  @MinLength(1)
  lastName: string;

  @Field()
  @MinLength(1)
  schoolId: string;
}

@ArgsType()
class UpdateWilderInput {
  @Field()
  @MinLength(1)
  id: string;

  @Field()
  @MinLength(1)
  firstName: string;

  @Field()
  @MinLength(1)
  lastName: string;
}

@ArgsType()
class AddSkillToWilderInput {
  @Field()
  @MinLength(1)
  wilderId: string;

  @Field()
  @MinLength(1)
  skillId: string;
}

export { CreateWilderInput, UpdateWilderInput, AddSkillToWilderInput };
