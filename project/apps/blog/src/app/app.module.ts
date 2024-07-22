import { Module } from '@nestjs/common';

import { AccountConfigModule } from '@project/account/config';
import { CommentModule } from '@project/blog/comment';
import { TagModule } from '@project/blog/tag';


@Module({
  imports: [AccountConfigModule, CommentModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
