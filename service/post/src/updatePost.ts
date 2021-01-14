import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
  postId: string;
  title: string;
  text: string;
}

export default async ({ userId, postId, title, text }: IParams) => {
  try {
    const updatedPost = await dynamoDB.update({
      TableName: process.env.TABLENAME!,
      Key: {
        PK: `POST#${userId}`,
        SK: `POST#${postId}`,
      },
      UpdateExpression: 'SET #title = :title, #text = :text',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#text': 'text',
      },
      ExpressionAttributeValues: {
        ':title': title,
        ':text': text,
      },
      ReturnValues: 'ALL_NEW',
    });

    return updatedPost.Attributes;
  } catch (error) {
    throw new Error(`UPDATE POST/${error}`);
  }
};
