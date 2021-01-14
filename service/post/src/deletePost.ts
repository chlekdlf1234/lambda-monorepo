import dynamoDB from '../../../packages/libs/dynamodb-lib';

interface IParams {
  userId: string;
  postId: string;
}

export default async ({ userId, postId }: IParams) => {
  try {
    const deletedPost = await dynamoDB.delete({
      TableName: process.env.TABLENAME!,
      Key: {
        PK: `POST#${userId}`,
        SK: `POST#${postId}`,
      },
      ReturnValues: 'ALL_OLD',
    });

    return deletedPost.Attributes;
  } catch (error) {
    throw new Error(`DELTE POST/${error}`);
  }
};
