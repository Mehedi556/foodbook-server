import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import noDataFoundResponse from "../../utils/noDataFoundResponse";

// This controller created for create new user
const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: {
            _id: result?._id,
            name: result?.name,
            email: result?.email,
            role: result?.role,
        },
    });
});
const updateUser = catchAsync(async (req, res) => {
    const id = req?.params?.id
    const result = await AuthServices.updateUserIntoDB(req.body, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
});

const getUser = catchAsync(async (req, res) => {
    const result = await AuthServices.getUserFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result
    });
});

  // This controller created for login
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result
    });
});

const followUser = catchAsync(async (req, res) => {
    const result = await AuthServices.followUser(req.user._id, req.body);

    if(!result){
        noDataFoundResponse(res, {
            success: false,
            statusCode: 404,
            message: "Facing problem to follow this user.",
            data: result
        })
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User followed by you successfully',
        data: result
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
    const email = req.body.email;
    const result = await AuthServices.forgetPassword(email)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully!',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await AuthServices.resetPassword(req.body, token as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset password successful!',
        data: result,
    });
})


export const AuthControllers = {
    createUser,
    updateUser,
    loginUser,
    followUser,
    refreshToken,
    getUser,
    changePassword,
    forgetPassword,
    resetPassword
};
