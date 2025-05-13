import mongoose, { Schema } from "mongoose";
import { ISearchHistory } from "./content.model";

const SearchHistorySchema = new Schema<ISearchHistory>({
    query: { type: String, required: true },
    results: [{
      contentId: { type: Schema.Types.ObjectId, ref: 'Content' },
      relevanceScore: Number,
      selected: { type: Boolean, default: false }
    }],
    feedback: {
      helpful: Boolean,
      notes: String
    },
    timestamp: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, required: true, index: true }
  },{timestamps: true});
  


export const SearchHistory = mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);  