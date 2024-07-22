import { Entity, StorableEntity, PostTag } from "@project/shared/core";

export class TagEntity extends Entity implements StorableEntity<PostTag> {
  public tag: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(tag?: PostTag){
    super();
    this.populate(tag);
  }

  public populate(tag?: PostTag){
    if (!tag) {
      return;
    }

    this.id = tag.id ?? undefined;
    this.tag = tag.tag;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }

  public toPOJO(): PostTag {
    return {
      id: this.id,
      tag: this.tag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
