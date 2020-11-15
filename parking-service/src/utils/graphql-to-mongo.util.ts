export type GraphQlOperations =
  | 'eq'
  | 'ne'
  | 'in'
  | 'nin'
  | 'contains'
  | 'ncontains'
  | 'lte'
  | 'lt'
  | 'gte'
  | 'gt';
export type MongooseOperations =
  | '$eq'
  | '$ne'
  | '$in'
  | '$nin'
  | '$regex'
  | '$lte'
  | '$lt'
  | '$gte'
  | '$gt';

export const graphQltoMongo: Record<GraphQlOperations, MongooseOperations> = {
  eq: '$eq',
  ne: '$ne',
  in: '$in',
  nin: '$nin',
  contains: '$regex',
  ncontains: '$regex',
  lte: '$lte',
  lt: '$lt',
  gte: '$gte',
  gt: '$gt',
};
