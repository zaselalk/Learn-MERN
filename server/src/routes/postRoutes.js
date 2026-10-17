import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createPost, getPosts, reactToPost } from "../controllers/postController.js";

// Routes only map URLs to controllers. Mounted at /api/posts in app.js.
const router = Router();

router.get("/", asyncHandler(getPosts));
router.post("/", asyncHandler(createPost));
router.patch("/:id/react", asyncHandler(reactToPost));

export default router;
