import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schema/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  //   constructor() {}
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('/register')
  async register(
    @Body() body: { username: string; password: string; role: string },
  ) {
    const { username, password, role } = body;

    // Validate input
    if (!username || !password || !role) {
      throw new BadRequestException('All fields are required');
    }

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return { message: 'User registered successfully' };
  }
}
