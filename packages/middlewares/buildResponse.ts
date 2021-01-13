import middy from '@middy/core';

interface IResponse {
  statusCode?: number;
  [key: string]: any;
}

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const buildErrorResponse = (error: Error): IResponse => {
  return {
    statusCode: 500,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      message: error.message,
    }),
  };
};

const buildJSONResponse = (response?: IResponse): IResponse => {
  if (!response) {
    return {
      statusCode: 204,
      headers: DEFAULT_HEADERS,
    };
  }

  if (response.statusCode) {
    return {
      ...response,
      headers: {
        ...DEFAULT_HEADERS,
        ...response.headers,
      },
    };
  }

  if (response.redirectUrl) {
    return {
      statusCode: 302,
      headers: {
        ...DEFAULT_HEADERS,
        Location: response.redirectUrl,
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: DEFAULT_HEADERS,
  };
};

export const buildResponse = () => ({
  after(handler: middy.HandlerLambda, next: middy.NextFunction) {
    handler.response = buildJSONResponse(handler.response);
    return next();
  },

  onError(handler: middy.HandlerLambda, next: middy.NextFunction) {
    handler.response = buildErrorResponse(handler.error);
    return next();
  },
});
