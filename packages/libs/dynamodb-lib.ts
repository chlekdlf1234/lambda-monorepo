import { DynamoDB } from 'aws-sdk';

const dynamoDB: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({
  convertEmptyValues: true,
  region: process.env.REGION,
});

export default class DDB {
  static get(param: DynamoDB.DocumentClient.GetItemInput): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    return dynamoDB.get(param).promise();
  }
  static put(param: DynamoDB.DocumentClient.PutItemInput): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    return dynamoDB.put(param).promise();
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
    return dynamoDB.update(param).promise();
  }
}
