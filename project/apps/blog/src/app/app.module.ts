import { Module } from '@nestjs/common';

import { CommentModule } from '@project/blog/comment';
import { TagModule } from '@project/blog/tag';


@Module({
  imports: [CommentModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
