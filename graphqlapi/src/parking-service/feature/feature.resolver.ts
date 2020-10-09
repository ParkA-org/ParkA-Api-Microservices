import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { FeatureService } from './feature.service';
import { CreateFeatureInput } from './inputs/create-feature.input';
import { FeatureType } from './types/feature.type';

@Resolver(of => FeatureType)
export class FeatureResolver {
  private logger = new Logger('FeatureResolver');

  constructor(private featureService: FeatureService) {}

  @Query(returns => FeatureType)
  public async getFeatureById(
    @Args('id')
    id: string,
  ): Promise<FeatureType> {
    this.logger.debug(
      `Received get feature by id with payload ${JSON.stringify(id)}`,
    );

    return this.featureService.getFeatureById(id);
  }

  @Query(returns => [FeatureType])
  public async getFeaturesByIds(
    @Args('ids')
    ids: string[],
  ): Promise<FeatureType[]> {
    this.logger.debug(
      `Received get features by ids with payload ${JSON.stringify(ids)}`,
    );

    return this.featureService.getFeaturesByIds(ids);
  }

  @Query(returns => [FeatureType])
  public async getAllFeatures(): Promise<FeatureType[]> {
    this.logger.debug(`Received get all features`);

    return this.featureService.getAllFeatures();
  }

  @Mutation(of => FeatureType)
  @UseGuards(AuthGuard)
  public async createFeature(
    @Args('createFeatureInput')
    createFeatureInput: CreateFeatureInput,
  ): Promise<FeatureType> {
    this.logger.debug(
      `Received create feature with payload ${JSON.stringify(
        createFeatureInput,
      )}`,
    );

    return this.featureService.createFeature(createFeatureInput);
  }
}
