import mongoose, { Schema, Document, Types, Model } from 'mongoose';

interface IMetadata {
  author?: string;
  publishedDate?: Date;
  lastUpdated?: Date;
  platform?: string;
  readingTime?: number;
  thumbnail?: string;
}

interface IRelationship {
  type: 'related' | 'parent' | 'child' | 'reference';
  contentId: Types.ObjectId;
}

interface IStats {
  views: number;
  importance: number;
  lastAccessed: Date;
}

interface IContent extends Document {
  title: string;
  type: 'link' | 'tweet' | 'video' | 'note' | 'document';
  content: string;
  url?: string;
  markdown?: string;
  tags: string[];
  astraVectorId?: string;  
  metadata: IMetadata;
  relationships: IRelationship[];
  stats: IStats;
  workspace: Types.ObjectId;
  created: Date;
  updated: Date;
  userId: Types.ObjectId;
}

interface ICustomField {
  name: string;
  type: string;
  required: boolean;
}

interface IWorkspaceSettings {
  isPrivate: boolean;
  defaultTags: string[];
  customFields: ICustomField[];
}

interface IWorkspace extends Document {
  name: string;
  description: string;
  icon?: string;
  parentWorkspace?: Types.ObjectId;
  settings: IWorkspaceSettings;
  created: Date;
  updated: Date;
  userId: Types.ObjectId;
}

interface ITag extends Document {
  name: string;
  description?: string;
  color?: string;
  parentTag?: Types.ObjectId;
  metadata: {
    usage: number;
    lastUsed: Date;
  };
  incrementUsage : () => void;
  created: Date;
  userId: Types.ObjectId;
}

interface ISearchResult {
  contentId: Types.ObjectId;
  relevanceScore: number;
  selected: boolean;
}

interface ISearchHistory extends Document {
  query: string;
  results: ISearchResult[];
  feedback?: {
    helpful: boolean;
    notes?: string;
  };
  timestamp: Date;
  userId: Types.ObjectId;
}

interface ITagModel extends Model<ITag> {
  incrementUsage(tagName: string, userId: Types.ObjectId): Promise<void>;
}

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true, index: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['web', 'tweet', 'video', 'note', 'document'] 
  },
  content: { type: String },
  url: { type: String },
  markdown: { type: String },
  tags: [{ type: String, index: true }],
  astraVectorId: { type: String },  
  metadata: {
    author: String,
    publishedDate: Date,
    lastUpdated: Date,
    platform: String,
    readingTime: Number,
    thumbnail: String
  },
  relationships: [{
    type: { 
      type: String, 
      enum: ['related', 'parent', 'child', 'reference'],
      required: true 
    },
    contentId: { type: Schema.Types.ObjectId, ref: 'Content', required: true }
  }],
  stats: {
    views: { type: Number, default: 0 },
    importance: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now }
  },
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
},{timestamps: true});



ContentSchema.index({ title: 'text', content: 'text' });


ContentSchema.statics.findByTag = function(tag: string, userId: Types.ObjectId) {
  return this.find({ tags: tag, userId });
};

ContentSchema.statics.findByWorkspace = function(workspaceId: Types.ObjectId, userId: Types.ObjectId) {
  return this.find({ workspace: workspaceId, userId });
};



ContentSchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  this.stats.lastAccessed = new Date();
  await this.save();
};

ContentSchema.methods.addRelationship = async function(
  relatedContentId: Types.ObjectId, 
  type: 'related' | 'parent' | 'child' | 'reference'
) {
  this.relationships.push({ type, contentId: relatedContentId });
  await this.save();
};




const Content = mongoose.model<IContent>('Content', ContentSchema);

export default Content;

export type {
  IContent,
  IWorkspace,
  ITag,
  ISearchHistory,
  IMetadata,
  IRelationship,
  IStats,
  ICustomField,
  IWorkspaceSettings,
  ISearchResult,
  ITagModel
};