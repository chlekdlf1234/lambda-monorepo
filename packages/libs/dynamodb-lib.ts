import { DynamoDB } from 'aws-sdk'; // eslint-disable-line

const dynamoDB: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({
  convertEmptyValues: true,
  region: process.env.REGION,
});

export default class DDB {
  static get(param: DynamoDB.DocumentClient.GetItemInput): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    return dynamoDB.get(param).promise();
  }

  static put(param: DynamoDB.DocumentClient.PutItemInput): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    const putTime: string = new Date().toISOString();

    const Item = Object.assign(param.Item, {
      createdAt: putTime,
      updatedAt: putTime,
    });

    const amendedParam = {
      ...param,
      Item,
    };

    return dynamoDB.put(amendedParam).promise();
  }

  static scan(param: DynamoDB.DocumentClient.ScanInput): Promise<DynamoDB.DocumentClient.ScanOutput> {
    return dynamoDB.scan(param).promise();
  }

  static query(param: DynamoDB.DocumentClient.QueryInput): Promise<DynamoDB.DocumentClient.QueryOutput> {
    return dynamoDB.query(param).promise();
  }

  static delete(param: DynamoDB.DocumentClient.DeleteItemInput): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {
    return dynamoDB.delete(param).promise();
  }

  static update(param: DynamoDB.DocumentClient.UpdateItemInput): Promise<DynamoDB.DocumentClient.UpdateItemOutput> {
    const UpdateExpression = param.UpdateExpression?.concat(', updatedAt = :updatedAt');
    const ExpressionAttributeValues = { ':updatedAt': new Date().toISOString(), ...param.ExpressionAttributeValues };

    const amendedParam = {
      ...param,
      UpdateExpression,
      ExpressionAttributeValues,
    };

    return dynamoDB.update(amendedParam).promise();
  }
}
