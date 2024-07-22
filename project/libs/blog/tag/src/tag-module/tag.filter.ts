import { Prisma } from '@prisma/client';

export interface TagFilter {
  id?: string;
  tag?: string;
}

export function tagFilterToPrismaFilter(filter: TagFilter): Prisma.TagWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.TagWhereInput = {};

  if (filter.tag) {
    prismaFilter = { tag: filter.tag };
  }

  return prismaFilter;
}
