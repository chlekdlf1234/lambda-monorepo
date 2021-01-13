import middy from '@middy/core';
import validator from '@middy/validator';

import buildRequest from '../../../packages/middlewares/buildRequest';
import buildResponse from '../../../packages/middlewares/buildResponse';

import { INormalizedEvent } from '../../types';

import getPostByUser from './getPostByUser';
import getPostByTime from './getPostByTime';
import putPost from './putPost';

import { getPostByTimeSchema, getPostByUserSchema, putPostSchema } from '../inputSchema';

interface IPutEvent extends INormalizedEvent {
  body: {
    title: string;
    text: string;
  };
}

interface IGetByTimeEvent extends INormalizedEvent {
  body: {
    time: string | null;
  };
}

const putPostFn = async (event: IPutEvent) =>
  putPost({
    userId: event.requestContext.identity.cognitoIdentityId!,
    title: event.body.title,
    text: event.body.text,
  });

const getPostByUserFn = async (event: INormalizedEvent) =>
  getPostByUser({
    userId: event.requestContext.identity.cognitoIdentityId!,
  });

const getPostByTimeFn = async (event: IGetByTimeEvent) =>
  getPostByTime({
    time: event.body.time,
  });

export const putPostHandler = middy(putPostFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: putPostSchema }));

export const getPostByUserHandler = middy(getPostByUserFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: getPostByUserSchema }));

export const getPostByTimeHandler = middy(getPostByTimeFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(validator({ inputSchema: getPostByTimeSchema }));
