import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  postId: string;
}

export default async ({ postId }: IParams) => {
  try {
    const postByTime = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        IndexName: process.env.INVERTINDEX!,
        KeyConditionExpression: 'SK = :SK',
        ExpressionAttributeValues: {
          ':SK': `POST#${postId}`,
        },
        Limit: 1,
      })
    ).Items;

    return postByTime;
  } catch (error) {
    throw new Error(`GET POST BY POST ID/${error}`);
  }
};
