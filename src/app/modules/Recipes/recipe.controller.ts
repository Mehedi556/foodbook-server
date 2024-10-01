import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RecipeServices } from "./recipe.service";
import noDataFoundResponse from "../../utils/noDataFoundResponse";

// controller for create recipe
const createRecipe = catchAsync(async (req, res) => {
    const result = await RecipeServices.createRecipeIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe created successfully',
        data: result,
    });
});

const getAllRecipes = catchAsync(async (req, res) => {
    const result = await RecipeServices.getAllRecipesFromDB(req?.query);

    // checking if the length of data is less then 1 then it will show (No data found) response.
    if(result?.result?.length < 1){
        noDataFoundResponse(res, {
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: result
        })
    } else {
        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipes retrieved successfully',
        data: result,
    });
}
});

const getSingleRecipe = catchAsync(async (req, res) => {
    const id = req?.params?.id;
    const result = await RecipeServices.getSingleRecipeFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe details retrieved successfully',
        data: result,
    });
});

// This controller is for update Recipe.
const updateRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RecipeServices.updateRecipeIntoDB(id, req.body);
    
    if(!result){
        noDataFoundResponse(res, {
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: result
        })
    } else{
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Recipe updated successfully',
            data: result,
        });
    }
});

const deleteRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RecipeServices.deleteRecipeFromDB(id);

    if(!result){
    noDataFoundResponse(res, {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: result
    })
    }else {
        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe deleted successfully',
        data: result,
    });
    }
});

export const RecipeControllers = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
}