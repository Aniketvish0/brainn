import { IUser } from "../models/user.model";

export const generateTokens = async (user: IUser) => {
    if (!user) throw new Error("User not found");
    
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    
    return { accessToken, refreshToken };
};