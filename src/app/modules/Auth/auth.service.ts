/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TSignup, TUserForUpdate } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";


// this service is created for create new user
const createUserIntoDB = async (payload:TSignup) => {
    const newUser = await User.create(payload);
    return newUser;
}

const updateUserIntoDB = async (payload:TUserForUpdate, id:string) => {
    const updateUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
  });
    return updateUser;
}

const getUserFromDB = async (_id:string) => {
    const result = await User.findById(_id);
    return result;
}

// this service is created for login user
const loginUser = async (payload:TLogin) => {
    const { email, password } = payload;

    const userExists = await User.findOne({ email }).select('+password');
    // finding user. If user is not found then throw error

    if (!userExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const passwordMatched = await bcrypt.compare(password, userExists?.password)
    console.log(passwordMatched);
    // matching password. if not matched then throw error.

    if (!passwordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Password');
    }

    const jwtPayload = {
        _id: userExists?._id,
        name: userExists?.name,
        email: userExists?.email,
        role: userExists?.role,
        profilePicture: userExists?.profilePicture,
        memberStatus: userExists?.memberStatus?.status,
        userStatus: userExists?.userStatus,
        isDeleted: userExists?.isDeleted,
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      );
    
      const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
      );

    return {
        accessToken,
        refreshToken,
        data: {
            _id: userExists?._id,
            name: userExists?.name,
            email: userExists?.email,
            role: userExists?.role,
        }
        
    };
}



const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  
    const { _id } = decoded;
  
    // checking if the user is exist
    const user = await User.findById(_id);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const jwtPayload = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      profilePicture: user?.profilePicture,
      memberStatus: user?.memberStatus?.status,
      userStatus: user?.userStatus,
      isDeleted: user?.isDeleted,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};

const changePassword = async (userData:JwtPayload, payload: { oldPassword: string; newPassword: string }) => {

    const user = await User.findById(userData._id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
  // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

  // checking if the user is blocked

    const userStatus = user?.userStatus;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    const isPasswordMatched = await bcrypt.compare(payload.oldPassword, user?.password)

    if(!isPasswordMatched){
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }

    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            _id: userData._id,
            role: userData.role,
        },
        {
            password: newHashedPassword
        },
    );

    return null;
}

const forgetPassword = async (email: string) => {
    // checking if the user is exist
    const user = await User.findOne({email: email});

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // console.log(user);
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.userStatus;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }


    const jwtPayload = {
      _id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        profilePicture: user?.profilePicture,
        memberStatus: user?.memberStatus?.status,
        userStatus: user?.userStatus,
        isDeleted: user?.isDeleted,
    };
  
    const resetToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      '10m',
    );


    const resetUILink = `${config.reset_pass_ui_link}/reset-password?id=${user._id}&token=${resetToken}`
    sendEmail(user.email, resetUILink)
}

const resetPassword = async (payload: { _id: string, password: string }, token: string) => {

  const user = await User.findById(payload._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.userStatus;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);
  
  if(payload._id !== decoded._id){
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
        _id: decoded._id,
        role: decoded.role,
    },
    {
        password: newHashedPassword
    },
  );
}

const followUser = async (userId: string, payload: { _id: string }) => {
  try {
    const follower = await User.findById(payload._id);
    if (!follower) {
      throw new Error('The follower user is not found in the database.');
    }
    // console.log(follower);

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('The user to follow is not found in the database.');
    }

    // console.log(user);

    const isFollowing = user.following.some(id => id.toString() === payload._id);
    // console.log(isFollowing);

    if (isFollowing) {
      user.following = user.following.filter(id => id.toString() !== payload._id);
      follower.followers = follower.followers.filter(id => id.toString() !== userId);
    } else {
      user.following.push(payload._id);
      follower.followers.push(userId);
    }

    await Promise.all([user.save(), follower.save()]);

    return user;
  } catch (error:any) {
    throw new Error(`Failed to follow/unfollow the user: ${error.message}`);
  }
};

export const AuthServices = {
    createUserIntoDB,
    updateUserIntoDB,
    getUserFromDB,
    loginUser,
    followUser,
    refreshToken,
    changePassword,
    resetPassword,
    forgetPassword
}