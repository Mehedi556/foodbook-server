
import { Schema, model } from "mongoose";
import { TSignup } from "./auth.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const signupSchema = new Schema<TSignup>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: 0
    },
    profilePicture: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    memberStatus: {
        status: {
            type: String,
            enum: [ "premium", "non-premium" ],
            required: true,
            default: "non-premium"
        },
        expiresIn: {
            type: Date
        }
    },
    role: {
        type: String,
        enum: [ "admin", "user"],
        required: true,
        default: "user"
    },
    following: {
        type: Number,
        required: true,
    },
    followers: {
        type: Number,
        required: true,
    },
    userStatus: {
        type: String,
        enum: [ "active" , "blocked"],
        required: true,
        default: "active"
    },
    isDeleted: {
        type: Boolean,
        required: false,
    },
},
{
    timestamps: true
})

signupSchema.pre('save', async function (next) {
this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
);
next();
});

signupSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TSignup>('User', signupSchema)
