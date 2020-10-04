import { Resolver } from '@nestjs/graphql';
import { CountryType } from './types/country.type';

@Resolver(of => CountryType)
export class CountryResolver {}
