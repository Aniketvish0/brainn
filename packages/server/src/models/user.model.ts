import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SignOptions } from 'jsonwebtoken';
dotenv.config();

export interface IUser extends Document {
    fullname: string;
    username: string;
    password: string;
    email: string;
    refreshToken?: string;
    isPaidUser: boolean;
    GeminiAPIKey?: string;
    ispasswordcorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

interface IUserModel extends Model<IUser> {
    ispasswordcorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema({
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        refreshToken: {
            type: String,
        },
        isPaidUser : {
            type : Boolean,    
            required: true,
            default: false,
        },
        GeminiAPIKey : {
            type : String,
            default : ""
        }
    },
    { 
        timestamps: true
    }
);

userSchema.methods.ispasswordcorrect = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function hashpassword(next) {
    if(!this.isModified("password")){
       return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    return next();
})

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME } as SignOptions
    );
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME } as SignOptions
    );
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
