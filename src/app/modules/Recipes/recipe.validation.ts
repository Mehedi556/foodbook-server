import { z } from "zod";

  // Comment validation
export const CommentSchema = z.object({
    author: z.string(),
    postId: z.string(),
    content: z.string().min(1, "Content cannot be empty"),
});

  // Recipe validation
export const RecipeSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title cannot be empty"),
        description: z.string().min(1, "Description cannot be empty"),
        ingredients: z.array(z.string()).min(1, "There must be at least one ingredient"),
        instructions: z.string().min(1, "Instructions cannot be empty"),
        image: z.array(z.string()).optional(),
        // image: z.array(z.string()).min(1, "At least one image is required"),
        tags: z.array(z.string()),
        isPublished: z.boolean(),
        isDeleted: z.boolean(),
        postStatus: z.enum(["premium", "non-premium"]),
        author: z.string(),
        rating: z.object({
            totalRatings: z.number().min(0),
            ratingCount: z.number().min(0),
            averageRating: z.number().min(0).max(5),
        }).optional(),
        comments: z.array(CommentSchema).optional(),
        upvotes: z.array(z.string()).optional(),
        downvotes: z.array(z.string()).optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    })
});
  // Comment update validation
export const UpdateCommentSchema = z.object({
    author: z.string(),
    postId: z.string(),
    content: z.string().min(1, "Content cannot be empty"),
});

  // Recipe update validation
export const UpdateRecipeSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    instructions: z.string().optional(),
    image: z.array(z.string().url("Image must be a valid URL")).optional(),
    tags: z.array(z.string()).optional(),
    cookingTime: z.number().optional(),
    isPublished: z.boolean().optional(),
    postStatus: z.enum(["premium", "non-premium"]).optional(),
    author: z.string().optional(),
    rating: z.object({
        totalRatings: z.number().optional(),
        ratingCount: z.number().optional(),
        averageRating: z.number().optional()
    }).optional(),
    comments: z.array(UpdateCommentSchema).optional(),
    upvotes: z.array(z.string()).optional(),
    downvotes: z.array(z.string()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});