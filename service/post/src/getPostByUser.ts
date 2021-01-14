import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
}

export default async ({ userId }: IParams) => {
  try {
    const postsByUser = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        KeyConditionExpression: 'PK = :postId',
        ExpressionAttributeValues: {
          ':postId': `POST#${userId}`,
        },
      })
    ).Items;

    return postsByUser;
  } catch (error) {
    throw new Error(`GET POST BY USER/${error}`);
  }
};
