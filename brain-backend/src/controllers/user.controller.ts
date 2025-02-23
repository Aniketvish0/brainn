import { Response } from "express";
import asyncHandler from "../utils/handler";
import User, { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { generateTokens } from "../utils/generateToken";
import { AuthRequest } from "../utils/types/Auth";

const handleUserSignup = asyncHandler(async (req: AuthRequest, res: Response) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        if (!firstname || !lastname || !username || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const userexists = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (userexists) {
            throw new ApiError(409, "User already exists");
        }

        const newuser = await User.create({
            fullname: `${firstname} ${lastname}`, 
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            isPaidUser: false,
            GeminiAPIKey: ""
        });

        if (!newuser) {
            throw new ApiError(500, "Error while creating user");
        }

        const createduser = await User.findById(newuser._id).select('-password -refreshToken');
        
        return res.status(201).json(
            new ApiResponse(201, createduser, "User created successfully")
        );

    } catch (error: any) {
        console.error("Signup Error:", error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Error while creating user"
        );
    }
});

const handleUserSignin = asyncHandler(async (req: AuthRequest, res: Response) => {
    try {

        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            throw new ApiError(400, "username, email or password is required");
        }

        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!user) {
            throw new ApiError(404, "User not found");
        }


        const correctpassword = await user.ispasswordcorrect(password);
        if (!correctpassword) {
            throw new ApiError(401, "Password is Incorrect");
        }

        const { accessToken, refreshToken } = await generateTokens(user as IUser);
        const loggedinUser = await User.findById(user?._id).select("-password -refreshToken");
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);
        return res.status(200).json(
            new ApiResponse(200, { user: loggedinUser, accessToken, refreshToken }, "User logged in successfully")
        );
    } catch (e: any) {
        console.log({"signin error": e});
        throw new ApiError(e.statusCode || 500, e?.message || "Error while logging in");
    }
});

const handleUserLogout = asyncHandler(async (req: AuthRequest, res: Response) => {
    try {
        const id = req?.user?._id;
        if (!id) throw new ApiError(401, "Unauthorized request");
        
        const user = await User.findByIdAndUpdate(
            id,
            {
                $unset: { refreshToken: 1 },
            },
            {
                new: true,
            }
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
        };

        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
    } catch (e:any) {
        return res.status(e.statusCode || 500).json(new ApiError(e.statusCode || 500, "Error while logout", e?.message));
    }
})

export {
  handleUserLogout,
  handleUserSignin,
  handleUserSignup
}