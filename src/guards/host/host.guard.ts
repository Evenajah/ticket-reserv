import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class HostGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const reflectId = this.reflector.get<string>('id', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const id = request.params[reflectId];
    const token = request.headers.authorization.replace(/Bearer\s+/, '');
    const tokenDecoded = await this.jwtService.decode(token);

    const findUser = await this.userModel.findById(new Types.ObjectId(id));

    if (findUser._id.toString() === tokenDecoded.id) {
      return true;
    }
    return false;
  }
}

export const ParamsTrack = (id: string) => SetMetadata('id', id);
