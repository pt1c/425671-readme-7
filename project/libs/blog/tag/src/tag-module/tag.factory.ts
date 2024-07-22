import { Injectable } from '@nestjs/common';

import { PostTag, EntityFactory } from '@project/shared/core';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagFactory implements EntityFactory<TagEntity> {
  public create(entityPlainData: PostTag): TagEntity {
    return new TagEntity(entityPlainData);
  }
}
