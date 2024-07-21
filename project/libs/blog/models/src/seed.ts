import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
import { Post, Comment, PostLike, PostTag, PostType, PostStatusType } from '@project/shared/core';
import { shuffleArray, getRandomItem, generateRandomValue } from '@project/shared/helpers';

const USERS_COUNT = 3;
// Dynamic read
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_VIDEO_COUNT = 1;
// Dynamic read
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_PHOTO_COUNT = 1;
// Dynamic read
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_TEXT_COUNT = 2;
// Dynamic read
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_QUOTE_COUNT = 1;
// Dynamic read
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POST_LINK_COUNT = 1
const TAGS_MAX_COUNT = 5;
const LIKES_MAX_COUNT = 50;
const COMMENTS_MAX_COUNT = 10;

function getPosts(userIds: string[]): Post[] {
  const postsArr: Post[] = [];

  Object.values(PostType).forEach((type) => {
    for(let i=0; i<eval("POST_"+type.toUpperCase()+"_COUNT"); i++){
      postsArr.push(getPost(userIds, type as PostType));
    }
  });

  shuffleArray(postsArr);
  return postsArr;
}

function getPost(userIds: string[], type: PostType): Post {
  const post: Post = {
    id: faker.string.uuid(),
    userId: getRandomItem(userIds),
    postType: type,
    status: PostStatusType.Published,
    title: '',
    announce: '',
    content: '',
    url: '',
    tags: getTags(),
    likes: getLikes(userIds),
    comments: getComments(userIds),
  }

  if(type === PostType.Text || type === PostType.Video){
    post.title = faker.lorem.sentence({ min: 3, max: 6 });
  }

  if(type == PostType.Text || type == PostType.Quote){
    post.announce = faker.lorem.sentence({ min: 5, max: 10 });
  }

  if(type == PostType.Quote){
    post.announce = faker.person.fullName();
  }

  if(type == PostType.Text || type == PostType.Quote || type == PostType.Link){
    post.content = faker.lorem.text();
  }

  if(type == PostType.Photo){
    post.url = faker.image.url();
  }

  if(type == PostType.Video){
    post.url = getRandomYouTubeVideoUrl()
  }

  if(type == PostType.Link){
    post.url = faker.internet.url();
  }

  return post;
}

function getRandomYouTubeVideoUrl() {
  const videos = [
    "dQw4w9WgXcQ", // Rick Astley - Never Gonna Give You Up
    "9bZkp7q19f0", // PSY - GANGNAM STYLE
    "3JZ_D3ELwOQ", // Maroon 5 - Sugar
    "e-ORhEE9VVg", // Ed Sheeran - Shape of You
    "RgKAFK5djSk", // Wiz Khalifa - See You Again ft. Charlie Puth
    "kXYiU_JCYtU", // Linkin Park - Numb
    "kJQP7kiw5Fk", // Luis Fonsi - Despacito ft. Daddy Yankee
    "fJ9rUzIMcZQ", // Queen - Bohemian Rhapsody
    "CevxZvSJLk8", // Katy Perry - Roar
    "60ItHLz5WEA", // Eminem - Without Me
  ];

  const randomIndex = Math.floor(Math.random() * videos.length);

  const randomVideoId = videos[randomIndex];
  return `https://www.youtube.com/watch?v=${randomVideoId}`;
}

function getUsersIds(): string[] {
  const usersIdsArr: string[] = [];

  for(let i=0; i<USERS_COUNT; i++){
    usersIdsArr.push(faker.string.uuid());
  }

  return usersIdsArr;
}

function getComments(usersIds: string[]): Comment[] {
  const commentsArr: Comment[] = [];
  const commentsNum = generateRandomValue(0, COMMENTS_MAX_COUNT);

  for(let i=0; i<commentsNum; i++){
    commentsArr.push(
      {
        id: faker.string.uuid(),
        userId: getRandomItem(usersIds),
        message: faker.lorem.sentences(),
      }
    );
  }

  return commentsArr;
}

function getTags(): PostTag[] {
  const tagsArr: PostTag[] = [];
  const tagsNum = generateRandomValue(0, TAGS_MAX_COUNT);

  for(let i=0; i<tagsNum; i++){
    tagsArr.push(
      {
        id: faker.string.uuid(),
        tag: faker.word.noun(),
      }
    );
  }

  return tagsArr;
}

function getLikes(userIds: string[]): PostLike[] {
  const likesArr: PostLike[] = [];
  const likesNum = generateRandomValue(0, LIKES_MAX_COUNT);

  for(let i=0; i<likesNum; i++){
    const userId = getRandomItem(userIds);

    const result = likesArr.find((likeObject, idx) => {
      if(likeObject.userId === userId){
        likesArr[idx].isDelete = !likesArr[idx].isDelete;
        return true;
      }
    });

    if(!result){
      likesArr.push(
        {
          id: faker.string.uuid(),
          userId,
          isDelete: false,
        }
      );
    }
  }

  return likesArr;
}

async function seedDb(prismaClient: PrismaClient) {
  const mockUsersIds = getUsersIds();
  const mockPosts = getPosts(mockUsersIds);


  for (const post of mockPosts) {
    //tags
    for (const tag of post.tags) {
      await prismaClient.tag.upsert({
        where: { tag: tag.tag },
        update: {},
        create: {
          id: tag.id,
          tag: tag.tag
        }
      });
    }

    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        postType: post.postType,
        status: post.status,
        title: post.title,
        announce: post.announce,
        content: post.content,
        url: post.url,
        tags: post.tags ? { connect: post.tags } : undefined,
        likes: post.likes ? { create: post.likes }: undefined,
        comments: post.comments ? { create: post.comments } : undefined
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
