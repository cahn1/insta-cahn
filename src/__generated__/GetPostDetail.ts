/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostDetail
// ====================================================

export interface GetPostDetail_post_author {
  id: string;
  name: string;
  profilePhoto: string;
  username: string;
}

export interface GetPostDetail_post_comments_author {
  id: string;
  name: string;
  profilePhoto: string;
}

export interface GetPostDetail_post_comments {
  id: string;
  author: GetPostDetail_post_comments_author;
  text: string;
  createdAt: string;
}

export interface GetPostDetail_post {
  id: string;
  author: GetPostDetail_post_author;
  photo: string;
  caption: string;
  isLikedByViewer: boolean;
  likeCount: number;
  comments: GetPostDetail_post_comments[];
}

export interface GetPostDetail {
  post: GetPostDetail_post | null;
}

export interface GetPostDetailVariables {
  postId: string;
}
