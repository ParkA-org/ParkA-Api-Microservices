import { Field, ObjectType } from '@nestjs/graphql';
import { IFeatureType } from '../interfaces/feature-type.interface';

@ObjectType('Feature')
export class FeatureType implements IFeatureType {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  id: string;
}
