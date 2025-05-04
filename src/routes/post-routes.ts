import { Hono } from "hono";
<<<<<<< HEAD
import { sessionMiddleware } from "./middlewares/session-middleware.js";
=======
>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
import {
  createPost,
  getAllPosts,
  getMePost,
  deletePost,
  getPostById,
  getPastPosts,
<<<<<<< HEAD
=======
  getPostsByUser,
  searchPosts
>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
} from "../controllers/posts/post-controller.js";
import {
  CreatePostError,
  GetPostError,
  GetMePostError,
  DeletePostError,
} from "../controllers/posts/post-types.js";
import { sessionMiddleware } from "./middlewares/session-middleware.js";

export const postRoutes = new Hono();

<<<<<<< HEAD
=======

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
postRoutes.post("/create-post", sessionMiddleware, async (context) => {
  const user = context.get("user");
  const input = await context.req.json();

  try {
    const result = await createPost({
      userId: user.id,
      input,
    });
<<<<<<< HEAD
=======

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
    return context.json({ data: result }, 200);
  } catch (e) {
    if (e === CreatePostError.BAD_REQUEST) {
      return context.json({ message: "Title and content are required" }, 400);
    }
    if (e === CreatePostError.UNAUTHORIZED) {
      return context.json({ message: "User is not authorized" }, 401);
<<<<<<< HEAD
    }
    return context.json({ message: "Internal Server Error" }, 500);
  }
});

postRoutes.get("/getAllposts", sessionMiddleware, async (context) => {
  const page = Number(context.req.query("page") || 1);
  const limit = Number(context.req.query("limit") || 10);
  try {
    const result = await getAllPosts(page, limit);

    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
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

    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    if (e === GetMePostError.BAD_REQUEST) {
      return context.json(
        {
          error: "User with given id does not have posts",
        },
        400
      );
    }
    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

postRoutes.delete("/deletepost/:postId", sessionMiddleware, async (context) => {
  const user = context.get("user");
=======
    }

    return context.json({ message: "Internal Server Error" }, 500);
  }
});





postRoutes.delete("/deletepost/:postId", sessionMiddleware, async (context) => {
  const userId = context.get("user").id;
  
>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
  const postId = String(await context.req.param("postId"));
  
  try {
    const response = await deletePost({
      userId: user.id,
      postId,
    });
<<<<<<< HEAD
=======

    console.log(response)

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
    return context.json(response, 200);
  } catch (e) {
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
  } catch (e) {
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
    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    console.error(e);
    return context.json({ message: "Internal server error" }, 500);
  }
});


//added get post by id function
postRoutes.get("/getpost/:postId", sessionMiddleware,async (context) => {
  const postId = String(await context.req.param("postId"));

  try {
    const result = await getPostById(postId);

    return context.json(
      {
        data: result,
      },
      200
    );
  } catch (e) {
    if (e === GetPostError.BAD_REQUEST) {
      return context.json(
        {
          message: "Post with given id does not exist",
        },
        400
      );
    }

    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
})

postRoutes.get("/pastposts", sessionMiddleware,async (context) => {
  const before = context.req.query("before") ?? new Date().toISOString(); 
  const page = Number(context.req.query("page") || 1); 
  const limit = Number(context.req.query("limit") || 10); 

  try {
    const result = await getPastPosts(before, page, limit);
    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    console.error(e);
    return context.json({ message: "Internal server error" }, 500);
  }
});

postRoutes.get("/getAllposts", sessionMiddleware, async (context) => {
  const user = context.get("user");
  const page = Number(context.req.query("page") || 1);
  const limit = Number(context.req.query("limit") || 10);

  try {
    const result = await getAllPosts(user.id, page, limit);

    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    console.error(e);
    return context.json({ message: "Internal Server Error" }, 500);
  }
});

postRoutes.get("/byUser/:userId", sessionMiddleware, async (context) => {
  const userId = context.req.param("userId");
  const page = Number(context.req.query("page") || 1);
  const limit = Number(context.req.query("limit") || 10);

  try {
    const result = await getPostsByUser({
      userId,
      page,
      limit,
    });

    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    return context.json({ message: "Internal Server Error" }, 500);
  }
});

postRoutes.get("/search", sessionMiddleware,async (context) => {
  const keyword = context.req.query("q") || "";
  const page = Number(context.req.query("page") || 1);
  const limit = Number(context.req.query("limit") || 10);

  try {
    const result = await searchPosts({
      keyword,
      page,
      limit,
    });

    return context.json(
      {
        data: result.posts,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
      200
    );
  } catch (e) {
    console.error("Search failed:", e);
    return context.json({ message: "Internal Server Error" }, 500);
  }
});
