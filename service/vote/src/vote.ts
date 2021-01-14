import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
  postId: string;
  upVote: boolean;
}

interface IUpdateParams extends IParams {
  weight: number;
}

const updatePostPoint = async ({ userId, postId, upVote, weight }: IUpdateParams) => {
  if (upVote) {
    await dynamoDB.update({
      TableName: process.env.TABLENAME!,
      Key: {
        PK: `USER#${userId}`,
        SK: `POST#${postId}`,
      },
      UpdateExpression: 'SET point = point + :incr',
      ExpressionAttributeValues: {
        ':incr': 1 * weight,
      },
      ReturnValues: 'ALL_NEW',
    });
  }

  await dynamoDB.update({
    TableName: process.env.TABLENAME!,
    Key: {
      PK: `USER#${userId}`,
      SK: `POST#${postId}`,
    },
    UpdateExpression: 'SET point = point + :incr',
    ExpressionAttributeValues: {
      ':incr': -1 * weight,
    },
    ReturnValues: 'ALL_NEW',
  });
};

export default async ({ userId, postId, upVote }: IParams) => {
  try {
    const voteByUser = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        KeyConditionExpression: 'PK = :userId and SK = :SK',
        ExpressionAttributeValues: {
          ':userId': `USER#${userId}`,
          ':SK': `POST#${postId}`,
        },
      })
    ).Items![0];

    if (voteByUser) {
      const beforeVoteStatus = voteByUser.upVote;

      if (upVote !== beforeVoteStatus) {
        await updatePostPoint({ userId, postId, upVote, weight: 2 });

        await dynamoDB.update({
          TableName: process.env.TABLENAME!,
          Key: {
            PK: `USER#${userId}`,
            SK: `POST#${postId}`,
          },
          UpdateExpression: 'SET upVote = :upVote',
          ExpressionAttributeValues: {
            ':upVote': upVote,
          },
          ReturnValues: 'ALL_NEW',
        });
        return true;
      }
      return true;
    }

    const voteItem = {
      PK: `USER#${userId}`,
      SK: `POST#${postId}`,
      model: 'vote',
      upVote,
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: voteItem,
    });

    await updatePostPoint({ userId, postId, upVote, weight: 1 });

    return true;
  } catch (error) {
    throw new Error(`DELTE POST/${error}`);
  }
};
