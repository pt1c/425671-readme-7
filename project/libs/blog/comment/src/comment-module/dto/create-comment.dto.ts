import { IsNotEmpty, IsString,IsUUID } from 'class-validator';
import { BlogCommentValidateMessage } from '../comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message: string;

  @IsString()
  @IsUUID(undefined, { message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
