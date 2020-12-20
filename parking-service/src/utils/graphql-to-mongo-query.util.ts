import { RpcException } from '@nestjs/microservices';
import { Point } from './../parking/entities/point.entity';
import {
  GraphQlOperations,
  GraphQlOperationsEnum,
  graphQltoMongo,
  MongooseOperations,
  MongooseOperationsEnum,
} from './graphql-to-mongo.util';

export function graphqlToMongoQueryUtil(filterObject: Record<string, any>) {
  const convertedFilterObject: Record<string, any> = {};

  const fields = Object.keys(filterObject);

  for (const field of fields) {
    //Get filter value
    const filterValue = filterObject[field];

    const {
      fieldName,
      mongoOperation,
      graphqlOperation,
    } = extractMongoDbOperationAndFieldName(field);

    //throw error if operation is not found
    if (!mongoOperation) {
      throw new RpcException('Operation not defined');
    }

    //Build operation object
    const operationObject = getMongoOperationObject(
      mongoOperation,
      graphqlOperation,
      filterValue,
    );

    convertedFilterObject[fieldName] = {
      ...convertedFilterObject[fieldName],
      ...operationObject,
    };
  }

  //   console.log(JSON.stringify(convertedFilterObject));
  return convertedFilterObject;
}

function extractMongoDbOperationAndFieldName(filter: string) {
  let mongoOperation: MongooseOperations;
  let graphqlOperation: GraphQlOperations;

  // Get field name and operation
  const fieldOperation = filter.split('_');

  // Get field name
  const fieldName = fieldOperation[0];

  //Get mongo operation based on graphql operation
  if (fieldOperation.length == 2) {
    graphqlOperation = <GraphQlOperations>fieldOperation[1];
    mongoOperation = graphQltoMongo[graphqlOperation];
  } else {
    mongoOperation = graphQltoMongo[GraphQlOperationsEnum.eq];
  }

  return { fieldName, mongoOperation, graphqlOperation };
}

function getMongoOperationObject(
  mongoOperation: MongooseOperations,
  graphqlOperation: GraphQlOperations,
  value: any,
) {
  const operationObject = {};

  switch (mongoOperation) {
    case MongooseOperationsEnum.$near:
      operationObject[mongoOperation] = nearOperationFormatter(value);
      break;

    case MongooseOperationsEnum.$regex:
      //Checks if the regex must exclude or match the expression
      operationObject[mongoOperation] =
        graphqlOperation == GraphQlOperationsEnum.contains
          ? regexContainsOperationFormatter(value)
          : regexNotContainsOperationFormatter(value);
      operationObject['$options'] = 'i';
      break;

    default:
      operationObject[mongoOperation] = value;
      break;
  }

  return operationObject;
}

function nearOperationFormatter(point: Point) {
  const { latitude, longitude } = point;
  const nearOperation = {
    $maxDistance: 20000,
    $geometry: { type: 'Point', coordinates: [longitude, latitude] },
  };

  return nearOperation;
}

function regexContainsOperationFormatter(text: string): string {
  return `.*${text}.*`;
}

function regexNotContainsOperationFormatter(text: string): string {
  return `^((?!.*${text}.*).)*$`;
}
