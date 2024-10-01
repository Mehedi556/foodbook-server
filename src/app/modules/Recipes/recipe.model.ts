import { model, Schema } from "mongoose";
import { IComment, IRecipe } from "./recipe.interface";

const CommentSchema = new Schema<IComment>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const RecipeSchema = new Schema<IRecipe>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    cookingTime: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    postStatus: {
        type: String,
        enum: ["premium", "non-premium"],
        default: "non-premium",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        totalRatings: {
            type: Number,
            min: 0,
            default: 0
        },
        ratingCount: {
            type: Number,
            min: 0,
            default: 0
        },
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
    upvotes: {
        type: [String],
        default: []
    },
    downvotes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const Comment = model<IComment>('Comment', CommentSchema);
export const Recipe = model<IRecipe>('Recipe', RecipeSchema);