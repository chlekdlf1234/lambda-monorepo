import middy from '@middy/core';
import validator from '@middy/validator';

import buildRequest from '../../../packages/middlewares/buildRequest';
import buildResponse from '../../../packages/middlewares/buildResponse';

import { INormalizedEvent } from '../../types'; // eslint-disable-line

import getPostsByUser from './getPostsByUser';
import getPosts from './getPosts';
import getPostByPostId from './getPostByPostId';
import putPost from './putPost';
import deletePost from './deletePost';
import updatePost from './updatePost';

import * as schema from '../inputSchema';

interface IPutEvent extends INormalizedEvent {
  body: {
    title: string;
    text: string;
  };
}

interface IGetByTimeEvent extends INormalizedEvent {
  body: {
    order: string | null;
  };
}
interface IGetByPostIdEvent extends INormalizedEvent {
  body: {
    postId: string;
  };
}
interface IUpdatePostEvent extends INormalizedEvent {
  body: {
    postId: string;
    title: string;
    text: string;
  };
}

const updatePostFn = (event: IUpdatePostEvent) =>
  updatePost({
    userId: event.requestContext.identity.cognitoIdentityId!,
    postId: event.pathParameters.post_id,
    title: event.body.title,
    text: event.body.text,
  });

const deletePostFn = (event: IGetByPostIdEvent) =>
  deletePost({
    userId: event.requestContext.identity.cognitoIdentityId!,
    postId: event.pathParameters.post_id,
  });

const putPostFn = (event: IPutEvent) =>
  putPost({
    userId: event.requestContext.identity.cognitoIdentityId!,
    title: event.body.title,
    text: event.body.text,
  });

const getPostByUserFn = (event: INormalizedEvent) =>
  getPostsByUser({
    userId: event.requestContext.identity.cognitoIdentityId!,
  });

const getPostsFn = (event: IGetByTimeEvent) =>
  getPosts({
    order: event.queryStringParameters ? event.queryStringParameters.order : null,
  });

const getPostByPostIdFn = (event: IGetByPostIdEvent) =>
  getPostByPostId({
    postId: event.pathParameters.post_id,
  });

export const updatePostHandler = middy(updatePostFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.updatePostSchema }));

export const deletePostHandler = middy(deletePostFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.deletePostSchema }));

export const putPostHandler = middy(putPostFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.putPostSchema }));

export const getPostsByUserHandler = middy(getPostByUserFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.getPostsByUserSchema }));

export const getPostsHandler = middy(getPostsFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.getPostsSchema }));

export const getPostByPostIdHandler = middy(getPostByPostIdFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: schema.getPostsByPostIdSchema }));
