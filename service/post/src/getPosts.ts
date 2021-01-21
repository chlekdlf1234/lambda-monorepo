import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  order: string | null;
}

export default async ({ order }: IParams) => {
  try {
    const posts = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        IndexName: process.env.GSI1INDEX!,
        KeyConditionExpression: 'GSI1PK = :GSI1PK and GSI1SK < :postTime',
        ExpressionAttributeValues: {
          ':GSI1PK': 'post',
          ':postTime': !order ? '2999-12-31T00:00:00.000Z' : order,
        },
        Limit: 2,
        ScanIndexForward: false,
      })
    ).Items;

    return posts;
  } catch (error) {
    throw new Error(`GET POST BY TIME/${error}`);
  }
};
