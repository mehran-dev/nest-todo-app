import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'username',
    description: 'username',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Password (min 6 characters)',
  })
  @IsNotEmpty()
  @Length(6)
  password: string;
}
