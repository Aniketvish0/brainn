import { Response } from "express";
import asyncHandler from "../utils/handler";
import { AuthRequest } from "../utils/types/Auth";
import { ApiError } from "../utils/ApiError";
import User from "../models/user.model";
import { Tag } from "../models/tag.model";
import { ApiResponse } from "../utils/ApiResponse";
import { isValidHexColor } from "../utils/validateHEXcolor";

const handleCreateTag = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
        name,
        description,
        color
    } = req.body;
 
    const userId = req.user?._id;
    if (!userId) throw new ApiError(401, "Authentication Required");

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (!name || name.trim().length === 0) {
        throw new ApiError(400, "Tag name is required");
    }

    const existingTag = await Tag.findOne({ 
        name: name.trim(),
        userId 
    });
    
    if (existingTag) {
        throw new ApiError(400, "Tag with this name already exists");
    }

    if (color && !isValidHexColor(color)) {
        throw new ApiError(400, "Invalid color format. Please use hex color code (e.g., #FF0000)");
    }

    try {
        const tag = await Tag.create({
            name: name.trim(),
            description: description?.trim(),
            color: color || '#808080',
            userId,
            parentTag : "",
            metadata: {
                usage: 0,
                lastUsed: new Date()
            }
        });

        res.status(201).json(
            new ApiResponse(
                201,
                { tag },
                "Tag created successfully"
            )
        );     
    } catch (error: any) {
        console.error("Tag creation error:", error);
        throw new ApiError(
            error.statusCode || 500,
            error?.message || "Error creating Tag"
        );
    }
});


export {
    handleCreateTag
}