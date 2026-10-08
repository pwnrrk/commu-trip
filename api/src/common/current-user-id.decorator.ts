import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

/**
 * Resolves the acting user's id for the request.
 *
 * TODO: replace the `x-user-id` header with the id from a verified auth
 * token once the auth module exists.
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = request.header('x-user-id');
    if (!userId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return userId;
  },
);


