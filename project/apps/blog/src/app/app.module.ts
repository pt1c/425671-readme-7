import { Module } from '@nestjs/common';

import { CommentModule } from '@project/blog/comment';


@Module({
  imports: [CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
