import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';

import WilderRepository from '../models/Wilder/repository';
import Wilder from '../models/Wilder/wilder.entity';
import { AddSkillToWilderInput, CreateWilderInput, UpdateWilderInput } from './wilder.input';

@Resolver(Wilder)
export default class WilderResolver {
  @Query(() => [Wilder])
  wilders(): Promise<Wilder[]> {
    return WilderRepository.getWilders();
  }

  @Mutation(() => Wilder)
  createWilder(
    @Args() { firstName, lastName, schoolId }: CreateWilderInput
  ): Promise<Wilder> {
    return WilderRepository.createWilder(firstName, lastName, schoolId);
  }

  @Mutation(() => Wilder)
  updateWilder(
    @Args() { id, firstName, lastName }: UpdateWilderInput
  ): Promise<Wilder> {
    return WilderRepository.updateWilder(id, firstName, lastName);
  }

  @Mutation(() => Wilder)
  deleteWilder(@Arg("id") id: string): Promise<Wilder> {
    return WilderRepository.deleteWilder(id);
  }

  @Mutation(() => Wilder)
  addSkillToWilder(
    @Args() { wilderId, skillId }: AddSkillToWilderInput
  ): Promise<Wilder> {
    return WilderRepository.addSkillToWilder(wilderId, skillId);
  }
}
