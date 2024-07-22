import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaClientService } from '@project/blog/models';
import { BasePostgresRepository } from '@project/shared/data-access';
import { PostTag } from '@project/shared/core';

import { TagEntity } from './tag.entity';
import { TagFactory } from './tag.factory';
import { TagFilter, tagFilterToPrismaFilter } from "./tag.filter";

import { MAX_TAG_LIMIT } from "./tag.constant";

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, PostTag> {
  constructor(
    entityFactory: TagFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async find(filter?: TagFilter): Promise<TagEntity[]> {
    const where = filter ?? tagFilterToPrismaFilter(filter);

    const documents = await this.client.tag.findMany({
      where,
      take: MAX_TAG_LIMIT
    });


    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findByName(tagName: string): Promise<TagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        tag: tagName,
      },
    });

    if (!document) {
      throw new NotFoundException(`Tag "${tagName}" not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByNames(tagNames: string[]): Promise<TagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        tag: {
          in: tagNames,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }


  public async findById(id: string): Promise<TagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByIds(ids: string[]): Promise<TagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async save(entity: TagEntity): Promise<void> {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async update(entity: TagEntity): Promise<void> {
    await this.client.tag.update({
      where: { id: entity.id },
      data: { tag: entity.tag }
    });
  }

  public async updateByTagName(tagName: string, entity: TagEntity): Promise<void> {
    await this.client.tag.update({
      where: { tag: tagName },
      data: { tag: entity.tag }
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: { id }
    });
  }

  public async deleteByTagName(tagName: string): Promise<void> {
    await this.client.tag.delete({
      where: { tag: tagName }
    });
  }

}
