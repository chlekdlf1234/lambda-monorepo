import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
}

export const getPostByUser = async ({ userId }: IParams) => {
  try {
    const postsByUser = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        KeyConditionExpression: 'PK = :postId',
        ExpressionAttributeValues: {
          ':postId': 'POST#' + userId,
        },
      })
    ).Items;

    return postsByUser;
  } catch (error) {
    throw new Error('get post by user failed');
  }
};
