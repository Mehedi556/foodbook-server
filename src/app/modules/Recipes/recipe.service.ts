/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../Auth/auth.model";
import { recipeSearchableFields } from "./recipe.constant";
import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";


const createRecipeIntoDB = async (payload: IRecipe) => {
    const userExists = await User.findById(payload?.author)

    if(userExists?.userStatus == 'blocked'){
        throw new Error("You can't post by this account, because this account is blocked by admin!")
    }
    const result = await Recipe.create(payload);
    return result;
};

// this service is for get all recipes from db
const getAllRecipesFromDB = async (query: Record<string, unknown>) => {

    const recipeQuery = new QueryBuilder(Recipe.find(), query).search(recipeSearchableFields).filter().sort().paginate().fields();

    const result = await recipeQuery.modelQuery.populate('author').populate('comments.author');
    
    const meta = await recipeQuery.countTotal();

    return {
        result,
        meta
    }
};

const getMyRecipesFromDB = async (id:string) => {
 const result = await Recipe.find({ author: id, isDeleted: false}).populate('author').populate('comments.author');
 return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await Recipe.findById({_id: id}).populate('author').populate('comments.author');
    return result;
};

const updateRecipeIntoDB = async (
    payload: Partial<IRecipe>
) => {
    const result = await Recipe.findOneAndUpdate(
    { _id: payload?._id },
    payload,
    {
        new: true,
    },
    );
    return result;
};

const updateVoteIntoDB = async (payload: { recipeId: string, vote: string, voterId: string }) => {
    const user = await User.findById(payload.voterId);
    if (!user) {
        throw new Error('This user is not found in the database for updating vote.');
    }

    const recipe = await Recipe.findById(payload.recipeId);
    if (!recipe) {
        throw new Error('Recipe not found in the database.');
    }

    const { vote, voterId } = payload;

    // Cast to Types.ObjectId[] temporarily to avoid type error
    const upvotes = recipe.upvotes as unknown as mongoose.Types.ObjectId[];
    const downvotes = recipe.downvotes as unknown as mongoose.Types.ObjectId[];

    const voterObjectId = new mongoose.Types.ObjectId(voterId);

    const removeFromArray = (arr: mongoose.Types.ObjectId[], id: mongoose.Types.ObjectId) => {
        return arr.filter(item => !item.equals(id));
    };

    if (vote === "up-vote") {
        if (upvotes.some(upvote => upvote.equals(voterObjectId))) {
            
            recipe.upvotes = removeFromArray(upvotes, voterObjectId) as unknown as mongoose.Schema.Types.ObjectId[];
        } else {
            if (downvotes.some(downvote => downvote.equals(voterObjectId))) {
                // Remove the voter ID from downvotes if found
                recipe.downvotes = removeFromArray(downvotes, voterObjectId) as unknown as mongoose.Schema.Types.ObjectId[];
            }
            recipe.upvotes.push(voterObjectId as unknown as mongoose.Schema.Types.ObjectId);
        }
    } else if (vote === "down-vote") {
        if (downvotes.some(downvote => downvote.equals(voterObjectId))) {
            recipe.downvotes = removeFromArray(downvotes, voterObjectId) as unknown as mongoose.Schema.Types.ObjectId[];
        } else {
            if (upvotes.some(upvote => upvote.equals(voterObjectId))) {
                // Remove the voter ID from upvotes if found
                recipe.upvotes = removeFromArray(upvotes, voterObjectId) as unknown as mongoose.Schema.Types.ObjectId[];
            }
            recipe.downvotes.push(voterObjectId as unknown as mongoose.Schema.Types.ObjectId);
        }
    }

    await recipe.save();
    return recipe;
};

const addCommentIntoDB = async ( payload: { author:string, content: string, postId: string }) => {

    try {
        const user = await User.findById(payload.author);
        if (!user) {
            throw new Error('This user is not found in the database for add comment.');
        }

        const recipe = await Recipe.findById(payload.postId);
        if (!recipe) {
            throw new Error('Recipe not found in the database.');
        }

        recipe.comments.push({...payload});

        await recipe.save();

        return recipe;
    } catch (error) {
        throw new Error('Failed to add comment to recipe');
    }
};

const updateCommentIntoDB = async (
    payload: any
) => {
    const { postId, commentId, content } = payload;
    try {
        const post = await Recipe.findById(postId);
    
    if (!post) {
        throw new Error("Recipe not found.");
    }

    const comment = post.comments.find(
        (comment: any) => comment._id.toString() === commentId
    );

    if (!comment) {
        throw new Error("Comment not found for the given author.");
    }

    comment.content = content;

    await post.save();

    return post;

    } catch (error:any) {
        throw new Error(`Failed to update comment: ${error.message}`);
    }

};

const deleteCommentFromDB = async (payload:any) => {
    const { postId, commentId } = payload;

try {
    const post = await Recipe.findById(postId);

    if (!post) {
        throw new Error("Post not found.");
    }

    const commentIndex = post.comments.findIndex(
        (comment: any) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
        throw new Error("Comment not found.");
    }

    post.comments.splice(commentIndex, 1);

    await post.save();

    return post;
} catch (error:any) {
    throw new Error(`Failed to delete comment: ${error.message}`);
}
};



const deleteRecipeFromDB = async (id: string) => {
    const result = await Recipe.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });

    return result;
};

export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getMyRecipesFromDB,
    getSingleRecipeFromDB,
    updateRecipeIntoDB,
    addCommentIntoDB,
    updateCommentIntoDB,
    deleteCommentFromDB,
    updateVoteIntoDB,
    deleteRecipeFromDB
};