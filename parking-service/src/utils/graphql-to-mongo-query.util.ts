import { RpcException } from '@nestjs/microservices';
import {
  GraphQlOperations,
  graphQltoMongo,
  MongooseOperations,
} from './graphql-to-mongo.util';

export function graphqlToMongoQueryUtil(filterObject: Record<string, any>) {
  const convertedFilterObject: Record<string, any> = {};

  const fields = Object.keys(filterObject);

  for (const field of fields) {
    const operationObject = {};
    // Get field name and operation
    const fieldOperation = field.split('_');

    // Get field name
    const fieldName = fieldOperation[0];

    //Get filter value
    const filterValue = filterObject[field];

    let graphqlOperation: GraphQlOperations;
    let mongoOperation: MongooseOperations;

    //Get mongo operation based on graphql operation
    if (fieldOperation.length == 2) {
      graphqlOperation = <GraphQlOperations>fieldOperation[1];
      mongoOperation = graphQltoMongo[graphqlOperation];
    } else {
      mongoOperation = graphQltoMongo['eq'];
    }

    //throw error if operation is not found
    if (!mongoOperation) {
      throw new RpcException('Operation not defined');
    }

    //Build operation object
    operationObject[mongoOperation] = filterValue;

    convertedFilterObject[fieldName] = {
      ...convertedFilterObject[fieldName],
      ...operationObject,
    };
  }

  console.log(convertedFilterObject);
  return convertedFilterObject;
}
