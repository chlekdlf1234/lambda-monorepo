export const updatePostSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['postId', 'title', 'text'],
    },
    pathParameter: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        post_id: { type: 'string' },
      },
      required: ['post_id', 'user_id'],
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

export const deletePostSchema = {
  type: 'object',
  properties: {
    pathParameter: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        post_id: { type: 'string' },
      },
      required: ['post_id', 'user_id'],
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
    pathParameter: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
      },
      required: ['user_id'],
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

export const getPostsByUserSchema = {
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
      pathParameter: {
        type: 'object',
        properties: {
          user_id: { type: 'string' },
        },
        required: ['user_id'],
      },
    },
  },
};

export const getPostsSchema = {
  type: 'object',
  properties: {
    pathParameter: {
      type: 'object',
      properties: {
        order: { type: 'string' },
      },
    },
  },
};

export const getPostsByPostIdSchema = {
  type: 'object',
  properties: {
    pathParameter: {
      type: 'object',
      properties: {
        postId: { type: 'string' },
      },
      required: ['postId'],
    },
  },
};
