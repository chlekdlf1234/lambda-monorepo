// eslint-disable-next-line
import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

const parseJSONBody = (event: APIGatewayProxyEvent): void => {
  if (!event.body) return;
  try {
    // eslint-disable-next-line no-param-reassign
    event.body = JSON.parse(event.body);
  } catch (err) {
    throw new Error('invalid JSON was provided');
  }
};

export default () => ({
  before(handler: middy.HandlerLambda, next: middy.NextFunction) {
    parseJSONBody(handler.event);
    return next();
  },
});
