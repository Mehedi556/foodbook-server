/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../Auth/auth.model";
import { recipeSearchableFields } from "./recipe.constant";
import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";


const createRecipeIntoDB = async (payload: IRecipe) => {
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
 const result = await Recipe.find({ author: id}).populate('author').populate('comments.author');
 return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await Recipe.findById({_id: id});
    return result;
};

const updateRecipeIntoDB = async (
    id: string,
    payload: Partial<IRecipe>,
) => {
    const result = await Recipe.findOneAndUpdate(
    { _id: id },
    payload,
    {
        new: true,
    },
    );
    return result;
};





const deleteRecipeFromDB = async (id: string) => {
    const result = await Recipe.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    },
    );
    return result;
};

export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getMyRecipesFromDB,
    getSingleRecipeFromDB,
    updateRecipeIntoDB,
    addCommentIntoDB,
    updateVoteIntoDB,
    deleteRecipeFromDB
};