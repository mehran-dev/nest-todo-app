import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { User } from '../schema/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private readonly jwtService: JwtService,

    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split('Bearer ')[1];

    try {
      const payload = (await jwt.verify(token, 'secret')) as any;
      // const payload = await this.jwtService.verify(token);

      const user = await this.userModel.findOne({
        _id: payload.id,
      });

      if (!user) return false;
      if (requiredRoles.includes(user.role)) return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
