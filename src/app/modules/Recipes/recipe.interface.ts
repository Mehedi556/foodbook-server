import { ObjectId } from "mongoose";

export interface IComment {
    author: ObjectId;
    postId: ObjectId;
    content: string;
}

interface IRating {
    totalRatings: number;
    ratingCount: number;
    averageRating: number;
}

export interface IRecipe {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    image: string[];
    tags?: string[];
    cookingTime: number;
    isPublished: boolean;
    postStatus: "premium" | "non-premium";
    author: ObjectId;
    rating: IRating;
    comments: IComment[];
    upvotes: ObjectId[];
    downvotes: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
