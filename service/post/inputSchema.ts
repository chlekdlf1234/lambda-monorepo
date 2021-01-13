export const putPostSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['title', 'text'],
    },
    requestContext: {
      type: 'object',
      properties: {
        identity: {
          type: 'object',
          properties: {
            cognitoIdentityId: { type: 'string' },
          },
          required: ['cognitoIdentityId'],
        },
      },
    },
  },
};

export const getPostByUserSchema = {
  type: 'object',
  properties: {
    requestContext: {
      type: 'object',
      properties: {
        identity: {
          type: 'object',
          properties: {
            cognitoIdentityId: { type: 'string' },
          },
        },
      },
    },
  },
};

export const getPostByTimeSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        time: { type: 'string' },
      },
    },
  },
};
