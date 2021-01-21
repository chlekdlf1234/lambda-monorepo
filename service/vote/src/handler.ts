import middy from '@middy/core';
import validator from '@middy/validator';

import buildRequest from '../../../packages/middlewares/buildRequest';
import buildResponse from '../../../packages/middlewares/buildResponse';

import { INormalizedEvent } from '../../types'; // eslint-disable-line

import vote from './vote';

import voteInputSchema from '../inputSchema';

interface IVoteEvent extends INormalizedEvent {
  body: {
    postId: string;
    upVote: boolean;
  };
}

const voteFn = (event: IVoteEvent) =>
  vote({
    userId: event.requestContext.identity.cognitoIdentityId!,
    postId: event.pathParameters.post_id,
    upVote: event.body.upVote,
  });

export default middy(voteFn)
  .use(buildRequest())
  .use(buildResponse())
  .use(
    validator({
      inputSchema: voteInputSchema,
    }),
  );
