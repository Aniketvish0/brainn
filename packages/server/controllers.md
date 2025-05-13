## ContentController:

<details>
<summary>createContent</summary>
Save new content (notes, links, videos, etc.).
</details>

<details>
<summary>updateContent</summary>
Edit existing content.
</details>

<details>
<summary>deleteContent</summary>
Remove content.
</details>

<details>
<summary>getContent</summary>
Fetch single content by ID.
</details>

<details>
<summary>getAllContent</summary>
Fetch all content with filters.
</details>

<details>
<summary>searchContent</summary>
Text-based search across content.
</details>

<details>
<summary>semanticSearch</summary>
RAG-based semantic search using Astra DB.
</details>

<details>
<summary>addRelationship</summary>
Add relationship between content pieces.
</details>

<details>
<summary>removeRelationship</summary>
Remove content relationships.
</details>

<details>
<summary>getRelatedContent</summary>
Get all related content.
</details>

<details>
<summary>importContent</summary>
Bulk import content (e.g., from Markdown files).
</details>

<details>
<summary>exportContent</summary>
Export content in different formats.
</details>

## WorkspaceController:

<details>
<summary>createWorkspace</summary>
Create new workspace.
</details>

<details>
<summary>updateWorkspace</summary>
Update workspace details.
</details>

<details>
<summary>deleteWorkspace</summary>
Delete workspace.
</details>

<details>
<summary>getWorkspace</summary>
Get workspace by ID.
</details>

<details>
<summary>getAllWorkspaces</summary>
Get all workspaces (with tree structure).
</details>

<details>
<summary>getWorkspaceContent</summary>
Get all content in a workspace.
</details>

<details>
<summary>updateWorkspaceSettings</summary>
Update workspace settings.
</details>

<details>
<summary>moveContent</summary>
Move content between workspaces.
</details>

## TagController:

<details>
<summary>createTag</summary>
Create new tag.
</details>

<details>
<summary>updateTag</summary>
Update tag details.
</details>

<details>
<summary>deleteTag</summary>
Delete tag.
</details>

<details>
<summary>getAllTags</summary>
Get all tags.
</details>

<details>
<summary>getTaggedContent</summary>
Get content by tag.
</details>

<details>
<summary>addTagToContent</summary>
Add tag to content.
</details>

<details>
<summary>removeTagFromContent</summary>
Remove tag from content.
</details>

<details>
<summary>getTagHierarchy</summary>
Get hierarchical tag structure.
</details>

## SearchController:

<details>
<summary>searchByText</summary>
Traditional text search.
</details>

<details>
<summary>searchBySimilarity</summary>
Semantic search using RAG.
</details>

<details>
<summary>searchByTag</summary>
Search content by tags.
</details>

<details>
<summary>searchByWorkspace</summary>
Search within workspace.
</details>

<details>
<summary>saveSearchHistory</summary>
Save search results.
</details>

<details>
<summary>getSearchHistory</summary>
Get user's search history.
</details>

<details>
<summary>provideFeedback</summary>
Save feedback on search results.
</details>

## VectorController:

<details>
<summary>generateEmbedding</summary>
Generate embeddings for content.
</details>

<details>
<summary>storeEmbedding</summary>
Store embeddings in Astra DB.
</details>

<details>
<summary>updateEmbedding</summary>
Update existing embeddings.
</details>

<details>
<summary>deleteEmbedding</summary>
Remove embeddings.
</details>

<details>
<summary>similaritySearch</summary>
Find similar content.
</details>

## ImportExportController:

<details>
<summary>importFromMarkdown</summary>
Import markdown files.
</details>

<details>
<summary>importFromNotion</summary>
Import from Notion.
</details>

<details>
<summary>importFromObsidian</summary>
Import from Obsidian.
</details>

<details>
<summary>exportToMarkdown</summary>
Export as markdown.
</details>

<details>
<summary>exportToJSON</summary>
Export as JSON.
</details>

<details>
<summary>backupBrain</summary>
Create full backup.
</details>

## AnalyticsController:

<details>
<summary>getContentStats</summary>
Get content usage statistics.
</details>

<details>
<summary>getTagStats</summary>
Get tag usage statistics.
</details>

<details>
<summary>getSearchStats</summary>
Get search statistics.
</details>

<details>
<summary>getMostViewedContent</summary>
Get most accessed content.
</details>

<details>
<summary>getContentRecommendations</summary>
Get personalized recommendations.
</details>

## UserPreferencesController:

<details>
<summary>updatePreferences</summary>
Update user preferences.
</details>

<details>
<summary>getPreferences</summary>
Get user preferences.
</details>

<details>
<summary>setDefaultWorkspace</summary>
Set default workspace.
</details>

<details>
<summary>setDefaultTags</summary>
Set default tags.
</details>

<details>
<summary>updateUISettings</summary>
Update UI preferences.
</details>
