import { defineSchema, defineTable } from "convex/server"
import { v, VObject } from "convex/values"

type baseFolderStructure = [
  folderName: string,
  subFolders?: baseFolderStructure,
  files?: string
]

export default defineSchema({
  documents: defineTable({
    userId: v.string(),
    title: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean()
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  files: defineTable({
    userId: v.string(),
    title: v.string(),
    storageId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_storage_id", ["storageId"]),
})