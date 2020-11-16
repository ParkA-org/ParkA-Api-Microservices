export enum GraphQlOperationsEnum {
  eq = 'eq',
  ne = 'ne',
  in = 'in',
  nin = 'nin',
  contains = 'contains',
  ncontains = 'ncontains',
  lte = 'lte',
  lt = 'lt',
  gte = 'gte',
  gt = 'gt',
  near = 'near',
}

export enum MongooseOperationsEnum {
  $eq = '$eq',
  $ne = '$ne',
  $in = '$in',
  $nin = '$nin',
  $regex = '$regex',
  $lte = '$lte',
  $lt = '$lt',
  $gte = '$gte',
  $gt = '$gt',
  $near = '$near',
}

export type GraphQlOperations =
  | GraphQlOperationsEnum.eq
  | GraphQlOperationsEnum.ne
  | GraphQlOperationsEnum.in
  | GraphQlOperationsEnum.nin
  | GraphQlOperationsEnum.contains
  | GraphQlOperationsEnum.ncontains
  | GraphQlOperationsEnum.lte
  | GraphQlOperationsEnum.lt
  | GraphQlOperationsEnum.gte
  | GraphQlOperationsEnum.gt
  | GraphQlOperationsEnum.near;

export type MongooseOperations =
  | MongooseOperationsEnum.$eq
  | MongooseOperationsEnum.$ne
  | MongooseOperationsEnum.$in
  | MongooseOperationsEnum.$nin
  | MongooseOperationsEnum.$regex
  | MongooseOperationsEnum.$lte
  | MongooseOperationsEnum.$lt
  | MongooseOperationsEnum.$gte
  | MongooseOperationsEnum.$gt
  | MongooseOperationsEnum.$near;

export const graphQltoMongo: Record<GraphQlOperations, MongooseOperations> = {
  eq: MongooseOperationsEnum.$eq,
  ne: MongooseOperationsEnum.$ne,
  in: MongooseOperationsEnum.$in,
  nin: MongooseOperationsEnum.$nin,
  contains: MongooseOperationsEnum.$regex,
  ncontains: MongooseOperationsEnum.$regex,
  lte: MongooseOperationsEnum.$lte,
  lt: MongooseOperationsEnum.$lt,
  gte: MongooseOperationsEnum.$gte,
  gt: MongooseOperationsEnum.$gt,
  near: MongooseOperationsEnum.$near,
};
