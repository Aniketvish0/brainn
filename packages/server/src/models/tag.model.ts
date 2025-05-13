import mongoose, { Schema } from "mongoose";
import { ITag,ITagModel } from "./content.model";
import { Types } from "mongoose";

const TagSchema = new Schema<ITag>({
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String },
    parentTag: { type: Schema.Types.ObjectId, ref: 'Tag' },
    metadata: {
      usage: { type: Number, default: 0 },
      lastUsed: { type: Date, default: Date.now }
    },
    userId: { type: Schema.Types.ObjectId, required: true, index: true }
},{timestamps:true});
  

TagSchema.statics.incrementUsage = async function(tagName: string, userId: Types.ObjectId) {
    const tag = await this.findOne({ name: tagName, userId });
    if (tag) {
      tag.metadata.usage += 1;
      tag.metadata.lastUsed = new Date();
      await tag.save();
    }
};


TagSchema.index({ name: 'text' });

export const Tag = mongoose.model<ITag, ITagModel>('Tag', TagSchema);