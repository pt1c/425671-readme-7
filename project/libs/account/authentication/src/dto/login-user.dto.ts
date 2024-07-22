import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';


export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'FuckYouHacker'
  })

  public password: string;
}
