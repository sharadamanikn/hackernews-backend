import type { Comment } from "../../generated/prisma/index.js";
<<<<<<< HEAD
=======

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
export enum CommentPostError {
  NOT_FOUND,
  UNAUTHORIZED,
}

export type CommentPostResult = {
  comment: Comment;
};

export type GetCommentPost = {
  comments: Array<Comment>;
  total: number;
};
export enum GetCommentPostError {
  BAD_REQUEST,
  UNAUTHORIZED,
}

export enum DeleteCommentError {
  NOT_FOUND,
  UNAUTHORIZED,
}

export type UpdateCommet = {
  comment: Comment;
};

export enum UpdateCommetError {
  NOT_FOUND,
  UNAUTHORIZED,
}
