import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });

    // If user doesn't exist
    if (!user) {
      return null;
    }

    // Compare entered password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords do not match, return null
    if (!isPasswordValid) {
      return null;
    }

    // Return the user if the password is correct
    return user;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      id: user._id,
      role: user.role,
    };

    this.validateUser(user.username, user.password);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
