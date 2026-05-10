import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';


@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  catch(exception: any, host: ArgumentsHost) {
    const status = exception.status || 500;
    const message = exception.message || 'Internal server error';

    // Returning a plain object instead of GraphQLError to avoid .toJSON() issues
    return {
      message,
      extensions: {
        code: exception.response?.error || exception.name || 'INTERNAL_SERVER_ERROR',
        status,
        response: exception.response
      }
    };
  }
}
