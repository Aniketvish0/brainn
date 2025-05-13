import { Response } from 'express';
import { AuthRequest } from '../utils/types/Auth';
import asyncHandler from '../utils/handler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { Workspace } from '../models/workspace.model';
import User from '../models/user.model';
import { Types } from 'mongoose';
import { IWorkspace } from '../models/workspace.model';

const validateCustomFields = (customFields: any[]) => {
  const validTypes = ['string', 'number', 'date', 'boolean', 'select'];
  
  for (const field of customFields) {
    if (!field.name) {
      throw new ApiError(400, "Custom field name is required");
    }
    if (!field.type || !validTypes.includes(field.type.toLowerCase())) {
      throw new ApiError(
        400, 
        `Invalid custom field type. Must be one of: ${validTypes.join(', ')}`
      );
    }
  }
  return true;
};

const checkCircularReference = async (
  parentId: Types.ObjectId, 
  workspaceId: Types.ObjectId
): Promise<boolean> => {
  if (!parentId) return false;
  
  let currentParent = await Workspace.findById(parentId).lean() as IWorkspace | null;
  const visited = new Set([workspaceId.toString()]);
  
  while (currentParent) {
    if (visited.has(currentParent._id.toString())) {
      return true;
    }
    visited.add(currentParent._id.toString());
    
    if (!currentParent.parentWorkspace) break;
    currentParent = await Workspace.findById(currentParent.parentWorkspace).lean() as IWorkspace | null;
  }
  
  return false;
};

const handleCreateWorkspace = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { 
    name, 
    description, 
    icon, 
    parentWorkspace,
    settings
  } = req.body;

  const userId = req.user?._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, "No user found");
  }

  if (!name || name.trim().length === 0) {
    throw new ApiError(400, "Workspace name is required");
  }

  const existingWorkspace = await Workspace.findOne({ 
    name: name.trim(),
    userId 
  });
  
  if (existingWorkspace) {
    throw new ApiError(400, "Workspace with this name already exists");
  }

  if (parentWorkspace) {
    const parentExists = await Workspace.findOne({ 
      _id: parentWorkspace,
      userId 
    });
    
    if (!parentExists) {
      throw new ApiError(404, "Parent workspace not found");
    }
  }


  const workspaceSettings = {
    isPrivate: settings?.isPrivate ?? true,
    defaultTags: settings?.defaultTags || [],
    customFields: settings?.customFields || []
  };

  if (workspaceSettings.customFields.length > 0) {
    validateCustomFields(workspaceSettings.customFields);
  }

  try {
    const workspace = await Workspace.create({
      name: name.trim(),
      description: description?.trim(),
      icon,
      parentWorkspace,
      settings: workspaceSettings,
      userId
    });

    if (await checkCircularReference(parentWorkspace, workspace._id)) {
      await Workspace.findByIdAndDelete(workspace._id);
      throw new ApiError(400, "Circular parent reference detected");
    }

    res.status(201).json(
      new ApiResponse(201,{workspace : workspace}, "Workspace Created Successfully")
    );

  } catch (error: any) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while creating workspace"
    );
  }
});

export { handleCreateWorkspace };