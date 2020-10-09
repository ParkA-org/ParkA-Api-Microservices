import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IFeatureType } from '../interfaces/feature-type.interface';

@ObjectType('Feature')
export class FeatureType implements IFeatureType {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Field()
  @IsUUID('4')
  id: string;
}
