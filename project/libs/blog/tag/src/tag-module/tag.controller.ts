import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';
import { TagService } from './tag.service';

import { TagRdo } from './rdo/tag.rdo';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';


@Controller('tags/')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {}

  @Get('/')
  public async index() {
    const tagEntities = await this.tagService.getAll();
    const tags = tagEntities.map((tag) => tag.toPOJO());
    return fillDto(TagRdo, tags);
  }

  @Get('/:tagName')
  public async showOneTagByName(@Param('tagName') tagName: string) {
    const tagEntity = await this.tagService.getTagbyName(tagName);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Get('/id/:tagId')
  public async showOneTagById(@Param('tagId') tagId: string) {
    const tagEntity = await this.tagService.getTagbyId(tagId);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.tagService.createTag(dto);
    return fillDto(TagRdo, newTag.toPOJO());
  }

  @Patch('/:tagName')
  public async update(@Param('tagName') tagName: string, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.tagService.updateByTagName(tagName, dto);
    return fillDto(TagRdo, updatedTag.toPOJO());
  }

  @Patch('/id/:tagId')
  public async updateById(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.tagService.update(tagId, dto);
    return fillDto(TagRdo, updatedTag.toPOJO());
  }

  @Delete('/:tagName')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('tagName') tagName: string) {
    await this.tagService.deleteByTagName(tagName);
  }

  @Delete('/id/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroyById(@Param('tagId') tagId: string) {
    await this.tagService.deleteById(tagId);
  }

}
