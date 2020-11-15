type GraphQlOperations =
  | '_ne'
  | '_in'
  | '_nin'
  | '_contains'
  | '_ncontains'
  | '_lte'
  | '_lt'
  | '_gte'
  | '_gt';
type MongooseOperations =
  | '$ne'
  | '$in'
  | '$nin'
  | '$regex'
  | '$lte'
  | '$lt'
  | '$gte'
  | '$gt';

export const graphQltoMongo: Record<GraphQlOperations, MongooseOperations> = {
  _ne: '$ne',
  _in: '$in',
  _nin: '$nin',
  _contains: '$regex',
  _ncontains: '$regex',
  _lte: '$lte',
  _lt: '$lt',
  _gte: '$gte',
  _gt: '$gt',
};
