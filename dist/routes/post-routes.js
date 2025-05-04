import { Hono } from "hono";
import { sessionMiddleware } from "./middlewares/session-middleware.js";
import { createPost, getAllPosts, getMePost, deletePost, getPostById, getPastPosts, } from "../controllers/posts/post-controller.js";
import { CreatePostError, GetPostError, GetMePostError, DeletePostError, } from "../controllers/posts/post-types.js";
export const postRoutes = new Hono();
postRoutes.post("/create-post", sessionMiddleware, async (context) => {
    const user = context.get("user");
    const input = await context.req.json();
    try {
        const result = await createPost({
            userId: user.id,
            input,
        });
        return context.json({ data: result }, 200);
    }
    catch (e) {
        if (e === CreatePostError.BAD_REQUEST) {
            return context.json({ message: "Title and content are required" }, 400);
        }
        if (e === CreatePostError.UNAUTHORIZED) {
            return context.json({ message: "User is not authorized" }, 401);
        }
        return context.json({ message: "Internal Server Error" }, 500);
    }
});
postRoutes.get("/getAllposts", sessionMiddleware, async (context) => {
    const page = Number(context.req.query("page") || 1);
    const limit = Number(context.req.query("limit") || 10);
    try {
        const result = await getAllPosts(page, limit);
        return context.json({
            data: result.posts,
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit),
            },
        }, 200);
    }
    catch (e) {
        return context.json({ message: e }, 404);
    }
});
postRoutes.get("/meposts", sessionMiddleware, async (context) => {
    const user = context.get("user");
    const page = Number(context.req.query("page") || 1);
    const limit = Number(context.req.query("limit") || 10);
    try {
        const result = await getMePost({
            userId: user.id,
            page,
            limit,
        });
        return context.json({
            data: result.posts,
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit),
            },
        }, 200);
    }
    catch (e) {
        if (e === GetMePostError.BAD_REQUEST) {
            return context.json({
                error: "User with given id does not have posts",
            }, 400);
        }
        return context.json({
            message: "Internal Server Error",
        }, 500);
    }
});
postRoutes.delete("/deletepost/:postId", sessionMiddleware, async (context) => {
    const user = context.get("user");
    const postId = String(await context.req.param("postId"));
    try {
        const response = await deletePost({
            userId: user.id,
            postId,
        });
        return context.json(response, 200);
    }
    catch (e) {
        if (e === DeletePostError.NOT_FOUND) {
            return context.json({ message: "Post not found" }, 404);
        }
        if (e === DeletePostError.UNAUTHORIZED) {
            return context.json({ message: "User is not authorized" }, 401);
        }
        return context.json({ message: "Internal server error" }, 500);
    }
});
postRoutes.get("/getpost/:postId", sessionMiddleware, async (context) => {
    const postId = String(await context.req.param("postId"));
    try {
        const result = await getPostById(postId);
        return context.json({ data: result }, 200);
    }
    catch (e) {
        if (e === GetPostError.BAD_REQUEST) {
            return context.json({ message: "Post not found" }, 400);
        }
        return context.json({ message: "Internal Server Error" }, 500);
    }
});
postRoutes.get("/pastposts", async (context) => {
    const before = context.req.query("before") ?? new Date().toISOString();
    const page = Number(context.req.query("page") || 1);
    const limit = Number(context.req.query("limit") || 10);
    try {
        const result = await getPastPosts(before, page, limit);
        return context.json({
            data: result.posts,
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit),
            },
        }, 200);
    }
    catch (e) {
        console.error(e);
        return context.json({ message: "Internal server error" }, 500);
    }
});
