import type { Post } from "../../generated/prisma/index.js";
<<<<<<< HEAD
=======

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
export type CreatePostInput = {
  title: string;
  content: string;
};
export type CreatePostResult = {
  post: Post;
};

export enum CreatePostError {
  BAD_REQUEST,
  UNAUTHORIZED,
}

export type GetPostResults = {
  posts: Array<Post>;
  total: number;
};
export enum GetPostError {
  BAD_REQUEST,
}

export type GetMePostResult = {
  posts: Array<Post>;
  total: number;
};

export enum GetMePostError {
  BAD_REQUEST,
}

export enum DeletePostError {
  NOT_FOUND,
  UNAUTHORIZED,
}

 export type SearchParams = {
  keyword: string;
  page: number;
  limit: number;
};