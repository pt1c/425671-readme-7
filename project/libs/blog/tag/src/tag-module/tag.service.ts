import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { TagRepository } from './tag.repository';
import { TagEntity } from './tag.entity';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) {}

  public async getAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  public async getTagbyName(tagName: string): Promise<TagEntity> {
    return this.tagRepository.findByName(tagName);
  }

  public async getTagsByNames(tagNames: string[]): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findByNames(tagNames);

    if (tags.length !== tagNames.length) {
      const foundTagNames = tags.map((tag) => tag.tag);
      const notFoundTagNames = tagNames.filter((tagName) => !foundTagNames.includes(tagName));

      if (notFoundTagNames.length > 0) {
        throw new NotFoundException(`Categories with ids ${notFoundTagNames.join(', ')} not found.`);
      }
    }

    return tags;
  }

  public async getTagbyId(id: string): Promise<TagEntity> {
    return this.tagRepository.findById(id);
  }

  public async getTagsByIds(tagIds: string[]): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findByIds(tagIds);

    if (tags.length !== tagIds.length) {
      const foundTagIds = tags.map((tag) => tag.id);
      const notFoundTagIds = tagIds.filter((tagId) => !foundTagIds.includes(tagId));

      if (notFoundTagIds.length > 0) {
        throw new NotFoundException(`Categories with ids ${notFoundTagIds.join(', ')} not found.`);
      }
    }

    return tags;
  }

  public async createTag(dto: CreateTagDto): Promise<TagEntity> {
    const existsTag = (await this.tagRepository.find({ tag: dto.tag })).at(0);
    if (existsTag) {
      throw new ConflictException('A tag already exists');
    }

    const newTag = new TagEntity(dto);
    await this.tagRepository.save(newTag);

    return newTag;
  }

  public async update(id: string, dto: UpdateTagDto): Promise<TagEntity> {
    const tagEntity = new TagEntity(dto);
    tagEntity.id = id;

    try {
      await this.tagRepository.update(tagEntity);
      return tagEntity;
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateByTagName(tagName: string, dto: UpdateTagDto): Promise<TagEntity> {
    const tagEntity = new TagEntity(dto);

    try {
      await this.tagRepository.updateByTagName(tagName, tagEntity);
      return tagEntity;
    } catch {
      throw new NotFoundException(`Tag ${tagName} not found`);
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      await this.tagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async deleteByTagName(tagName: string): Promise<void> {
    try {
      await this.tagRepository.deleteByTagName(tagName);
    } catch {
      throw new NotFoundException(`Tag ${tagName} not found`);
    }
  }

}
