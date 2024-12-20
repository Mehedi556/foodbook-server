import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RecipeServices } from "./recipe.service";
import noDataFoundResponse from "../../utils/noDataFoundResponse";

// controller for create recipe
const createRecipe = catchAsync(async (req, res) => {
    console.log(req.body);
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
const getMyRecipes = catchAsync(async (req, res) => {
    const result = await RecipeServices.getMyRecipesFromDB(req.params.id);

    // checking if the length of data is less then 1 then it will show (No data found) response.
    if(!result){
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
        message: 'My recipes retrieved successfully',
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
    const result = await RecipeServices.updateRecipeIntoDB(req.body);
    
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

const updateVote = catchAsync(async (req, res) => {
    const result = await RecipeServices.updateVoteIntoDB(req.body);
    
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
            message: 'Vote updated successfully',
            data: result,
        });
    }
});

const addComment = catchAsync(async (req, res) => {
    const result = await RecipeServices.addCommentIntoDB(req.body);
    
    if(!result){
        noDataFoundResponse(res, {
            success: false,
            statusCode: 404,
            message: "Failed to add comment.",
            data: result
        })
    } else{
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Comment added successfully',
            data: result,
        });
    }
});

const updateComment = catchAsync(async (req, res) => {
    const result = await RecipeServices.updateCommentIntoDB(req.body);
    
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
            message: 'Comment updated successfully',
            data: result,
        });
    }
});

const deleteComment = catchAsync(async (req, res) => {
    const result = await RecipeServices.deleteCommentFromDB(req.body);

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
        message: 'Comment deleted successfully',
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
    getMyRecipes,
    getSingleRecipe,
    updateRecipe,
    addComment,
    updateComment,
    deleteComment,
    deleteRecipe,
    updateVote
}