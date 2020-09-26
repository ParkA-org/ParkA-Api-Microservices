import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BodyStyleType } from './types/body-style.type';
import { CreateBodyStyleInput } from './inputs/body-style-type.input';
import { GetBodyStyleByIdInput } from './inputs/get-body-style-by-id.input';
import { BodyStyleService } from './body-style.service';
import { Logger } from '@nestjs/common';

@Resolver(of => BodyStyleType)
export class BodyStyleResolver {
  private logger = new Logger('BodyStyleResolver');

  constructor(private bodyStyleService: BodyStyleService) {}

  @Query(returns => BodyStyleType)
  public async getBodyStyleById(
    @Args('getBodyStyleByIdInput')
    getBodyStyleByIdInput: GetBodyStyleByIdInput,
  ): Promise<BodyStyleType> {
    this.logger.debug(
      `Received get body style by input with payload ${JSON.stringify(
        getBodyStyleByIdInput,
      )}`,
    );

    return this.bodyStyleService.getBodyStyleById(getBodyStyleByIdInput);
  }

  @Query(returns => [BodyStyleType])
  public async getAllBodyStyles(): Promise<BodyStyleType[]> {
    this.logger.debug(`Received get all body styles`);

    return this.bodyStyleService.getAllBodyStyles();
  }

  @Mutation(of => BodyStyleType)
  public async createBodyStyle(
    @Args('createBodyStyleInput')
    createBodyStyleInput: CreateBodyStyleInput,
  ): Promise<BodyStyleType> {
    this.logger.debug(
      `Received create body style with payload ${JSON.stringify(
        createBodyStyleInput,
      )}`,
    );

    return this.bodyStyleService.createBodyStyle(createBodyStyleInput);
  }
}
