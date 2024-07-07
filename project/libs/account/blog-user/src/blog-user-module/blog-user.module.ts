import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';

@Module({
  controllers: [],
  providers: [BlogUserRepository, BlogUserFactory],
  exports: [],
})
export class BlogUserModule {}
