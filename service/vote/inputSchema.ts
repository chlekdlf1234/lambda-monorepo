export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        upVote: { type: 'boolean' },
      },
      required: ['upVote'],
    },
    pathParameters: {
      type: 'object',
      properties: {
        post_id: { type: 'string' },
      },
      required: ['post_id'],
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
