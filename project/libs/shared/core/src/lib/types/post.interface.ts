export enum PostType {
  Photo = 'photo',
  Video = 'video',
  Text = 'text',
  Quote = 'quote',
  Link = 'link'
}

export enum PostStatusType {
  Published = 'published',
  Draft = 'draft'
}

export interface Post {
  id?: string;
  tags?: PostTag[];
  author: string;
  status: PostStatusType;
  created: Date;
  published: Date;
}

export type PostPhoto = Post & {
  type: PostType.Photo;
  photo: string;
}

export type PostVideo = Post & {
  type: PostType.Video;
  title: string;
  url: string;
}

export type PostText = Post & {
  type: PostType.Text;
  title: string;
  announce: string;
  text: string;
}

export type PostQuote = Post & {
  type: PostType.Quote;
  text: string;
  quoteAuthor: string;
}

export type PostLink = Post & {
  type: PostType.Link;
  url: string;
  description?: string;
}

export type PostTag = {
  id?: string;
  tag: string;
}
