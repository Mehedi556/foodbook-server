import QueryBuilder from "../../builder/QueryBuilder";
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

    const result = await recipeQuery.modelQuery.populate('author');
    const meta = await recipeQuery.countTotal();

    return {
        result,
        meta
    }
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
    getSingleRecipeFromDB,
    updateRecipeIntoDB,
    deleteRecipeFromDB
};