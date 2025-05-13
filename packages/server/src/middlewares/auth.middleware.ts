import { Response , NextFunction } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";
import User from "../models/user.model";
import { AuthRequest } from "../utils/types/Auth";

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const accessToken = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
        if (!accessToken) {
            res.status(401).json({ error: "Authorization is required" });
            return; 
        }

        const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        const user = await User.findById(userData._id).select("-password -refreshToken");

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return; 
        }

        req.user = user;
        next(); 
    } catch (error) {
        res.status(401).json({ error: "Invalid access token" });
        return; 
    }
}
