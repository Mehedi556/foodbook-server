import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

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
        token: result?.token,
        data: result?.data
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
    const _id = req.body._id;
    const result = await AuthServices.forgetPassword(_id)

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
    loginUser,
    refreshToken,
    getUser,
    changePassword,
    forgetPassword,
    resetPassword
};
