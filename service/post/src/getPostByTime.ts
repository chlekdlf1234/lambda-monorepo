import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  time: string | null;
}

export const getPostByTime = async ({ time }: IParams) => {
  try {
    if (!time) {
      time = '20000-01-01T00:00:00.000Z';
    }

    const postByTime = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        IndexName: process.env.GSI1INDEX!,
        KeyConditionExpression: 'GSI1PK = :GSI1PK and GSI1SK < :postTime',
        ExpressionAttributeValues: {
          ':GSI1PK': 'post',
          ':postTime': time,
        },
        Limit: 2,
        ScanIndexForward: false,
      })
    ).Items;

    return postByTime;
  } catch (error) {
    throw new Error('get post by time failed');
  }
};
