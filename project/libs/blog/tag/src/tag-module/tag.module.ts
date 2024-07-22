import { Module } from '@nestjs/common';

import { TagController } from './tag.controller';
import { TagFactory } from './tag.factory';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

import { PrismaClientModule } from '@project/blog/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [TagController],
  providers: [TagService, TagRepository, TagFactory],
  exports: [],
})
export class TagModule {}
