import { PostTag } from './post-tag.interface'
import { Comment } from './comment.interface'
import { PostLike } from './post-like.interface'
import { PostType } from './post-type.enum'
import { PostStatusType } from './post-status-type.enum'

export interface Post {
  id?: string;
  userId: string;
  postType: PostType;
  status: PostStatusType;
  title: string;
  announce: string;
  content: string;
  url: string;
  tags?: PostTag[];
  likes: PostLike[],
  comments: Comment[],
  published?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
