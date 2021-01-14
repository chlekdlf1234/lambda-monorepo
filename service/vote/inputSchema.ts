export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        postId: { type: 'string' },
        upVote: { type: 'boolean' },
      },
      required: ['postId', 'upVote'],
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
