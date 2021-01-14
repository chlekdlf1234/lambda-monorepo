import { APIGatewayEventRequestContext } from 'aws-lambda'; // eslint-disable-line

export interface INormalizedEvent {
  headers: {
    [name: string]: string;
  };
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: { [name: string]: string } | {};
  queryStringParameters: { [name: string]: string } | {};
  stageVariables: { [name: string]: string } | null;
  requestContext: APIGatewayEventRequestContext;
  resource: string;
  body: any;
}
