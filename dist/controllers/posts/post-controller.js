import { prismaClient } from "../../extras/prisma.js";
import { CreatePostError, GetPostError, GetMePostError, DeletePostError, } from "./post-types.js";
export const createPost = async (parameters) => {
    const { userId, input } = parameters;
    if (!input.title || !input.content)
        throw CreatePostError.BAD_REQUEST;
    const post = await prismaClient.post.create({
        data: {
            title: input.title,
            content: input.content,
            userId,
        },
    });
    return {
        post,
    };
};
export const getAllPosts = async (page = 1, limit = 10) => {
    const posts = await prismaClient.post.findMany({
        orderBy: {
            createdAt: "asc",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    if (!posts) {
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
    if (!posts) {
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
        message: "Post deleted suceesfully",
    };
};
