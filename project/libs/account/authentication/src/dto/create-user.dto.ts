import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'Username',
    example: 'Djonny',
  })
  public username: string;

  @ApiProperty({
    description: 'Avatar image',
    example: 'some.png'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'FuckYouHacker'
  })
  public password: string;
}
