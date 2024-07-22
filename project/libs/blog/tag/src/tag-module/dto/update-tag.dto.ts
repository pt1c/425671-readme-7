import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'sexy'
  })
  public tag: string;
}
