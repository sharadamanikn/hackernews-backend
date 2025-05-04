import { prismaClient } from "../../extras/prisma.js";
import { GetMeError } from "../users/user-types.js";
import { CreatePostError, GetPostError, GetMePostError, DeletePostError, } from "./post-types.js";
export const createPost = async (parameters) => {
    const { userId, input } = parameters;
    if (!input.title || !input.content) {
        throw CreatePostError.BAD_REQUEST;
    }
    const post = await prismaClient.post.create({
        data: {
            title: input.title,
            content: input.content,
            userId,
        },
    });
    return { post };
};
export const getAllPosts = async (page = 1, limit = 10) => {
    const posts = await prismaClient.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    if (!posts || posts.length === 0) {
        throw GetPostError.BAD_REQUEST;
    }
    const totalPosts = await prismaClient.post.count();
    return {
        posts,
        total: totalPosts,
    };
};
export const getMePost = async (parameters) => {
    const posts = await prismaClient.post.findMany({
        where: {
            userId: parameters.userId,
        },
        orderBy: {
            createdAt: "asc",
        },
        skip: (parameters.page - 1) * parameters.limit,
        take: parameters.limit,
    });
    if (!posts || posts.length === 0) {
        throw GetMePostError.BAD_REQUEST;
    }
    const totalPosts = await prismaClient.post.count();
    return {
        posts,
        total: totalPosts,
    };
};
export const deletePost = async (parameters) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: parameters.userId,
        },
    });
    if (!user) {
        throw DeletePostError.UNAUTHORIZED;
    }
    const post = await prismaClient.post.findUnique({
        where: {
            id: parameters.postId,
        },
    });
    if (!post) {
        return DeletePostError.NOT_FOUND;
    }
    await prismaClient.post.delete({
        where: {
            id: parameters.postId,
        },
    });
    return {
        message: "Post deleted successfully",
    };
};
export const getPostById = async (postId) => {
    const post = await prismaClient.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        throw GetMeError.BAD_REQUEST;
    }
    return post;
};
export const getPastPosts = async (before, page = 1, limit = 10) => {
    const beforeDate = new Date(before);
    const posts = await prismaClient.post.findMany({
        where: {
            createdAt: {
                lt: beforeDate,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    const totalPosts = await prismaClient.post.count({
        where: {
            createdAt: {
                lt: beforeDate,
            },
        },
    });
    return {
        posts,
        total: totalPosts,
    };
};
