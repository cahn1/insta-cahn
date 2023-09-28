/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_posts_author {
  id: string;
  name: string;
  profilePhoto: string;
}

export interface GetPosts_posts {
  id: string;
  photo: string;
  caption: string;
  isLikedByViewer: boolean;
  likeCount: number;
  commentCount: number;
  author: GetPosts_posts_author;
}

export interface GetPosts {
  posts: GetPosts_posts[];
}
