import { Injectable, NotImplementedException } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogCommentRepository: CommentRepository
  ) {}

  public async getComments(postId: string): Promise<CommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    throw new NotImplementedException();
  }
}
