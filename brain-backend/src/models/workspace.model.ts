import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    icon?: string;
    parentWorkspace?: Types.ObjectId;
    settings: {
        isPrivate: boolean;
        defaultTags: string[];
        customFields: any[];
    };
    userId: Types.ObjectId;
}

const WorkspaceSchema = new Schema<IWorkspace>({
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    parentWorkspace: { type: Schema.Types.ObjectId || null, ref: 'Workspace' , default : "null"},
    settings: {
      isPrivate: { type: Boolean, default: true },
      defaultTags: [String],
      customFields: [{
        name: String,
        type: String,
        required: { type: Boolean, default: false }
      }]
    },
    userId: { type: Schema.Types.ObjectId, required: true, index: true }
},{timestamps: true});


WorkspaceSchema.index({ name: 'text', description: 'text' });  
  

export const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema); 