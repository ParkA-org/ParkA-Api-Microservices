import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BodyStyleType } from './types/body-style.type';
import { CreateBodyStyleInput } from './inputs/body-style-type.input';
import { GetBodyStyleByIdInput } from './inputs/get-body-style-by-id.input';
import { BodyStyleService } from './body-style.service';

@Resolver()
export class BodyStyleResolver {
  constructor(private bodyStyleService: BodyStyleService) {}

  @Query(returns => BodyStyleType)
  public async getBodyStyleById(
    @Args('getBodyStyleByIdInput')
    getBodyStyleByIdInput: GetBodyStyleByIdInput,
  ): Promise<BodyStyleType> {
    return this.bodyStyleService.getBodyStyleById(getBodyStyleByIdInput);
  }

  @Query(returns => [BodyStyleType])
  public async getAllBodyStyles(): Promise<BodyStyleType[]> {
    return this.bodyStyleService.getAllBodyStyles();
  }

  @Mutation(of => BodyStyleType)
  public async createBodyStyle(
    @Args('createVehicleTypeInput')
    createBodyStyleInput: CreateBodyStyleInput,
  ): Promise<BodyStyleType> {
    return this.bodyStyleService.createBodyStyle(createBodyStyleInput);
  }
}
