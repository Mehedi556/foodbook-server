import { ObjectId } from "mongoose";

export interface IComment {
    author: string;
    postId: string;
    content: string;
}

interface IRating {
    totalRatings: number;
    ratingCount: number;
    averageRating: number;
}

export interface IRecipe {
    _id?: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    image: string[];
    tags?: string[];
    isPublished: boolean;
    isDeleted: boolean;
    postStatus: "premium" | "non-premium";
    author: ObjectId;
    rating: IRating;
    comments: IComment[];
    upvotes: ObjectId[];
    downvotes: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
