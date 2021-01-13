import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
  title: string;
  text: string;
}

export const putPost = async ({ userId, title, text }: IParams) => {
  try {
    const putTime: string = new Date().toISOString();

    const postItem = {
      PK: 'POST#' + userId,
      SK: 'POST#' + title + '#' + putTime,
      point: 0,
      creatorId: 'USER#' + userId,
      title,
      text,
      model: 'post',
      GSI1PK: 'post',
      GSI1SK: putTime,
      createdAt: putTime,
      updatedAt: putTime,
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: postItem,
    });

    return postItem;
  } catch (error) {
    throw new Error(error);
  }
};
