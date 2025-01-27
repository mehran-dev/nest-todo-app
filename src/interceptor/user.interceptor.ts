import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor() {
    // console.log('UserInterceptor Initialized');
  }
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split('Bearer ')[1];
    // console.log(token);
    if (!token) {
      console.log('no token provided !');
    }
    const user = await jwt.decode(token, 'secret');

    console.log('user in interceptor ', user);

    request.user = user;
    return handler.handle();
  }
}
