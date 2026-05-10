import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqreq = ctx.getContext().req;
    if (gqreq) {
      return gqreq.user;
    }
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);
