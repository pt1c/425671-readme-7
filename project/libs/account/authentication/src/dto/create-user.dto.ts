import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';


export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'Username',
    example: 'Djonny',
  })
  @IsString()
  public username: string;

  @ApiProperty({
    description: 'Avatar image',
    example: 'some.png'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'FuckYouHacker'
  })
  @IsString()
  public password: string;
}
