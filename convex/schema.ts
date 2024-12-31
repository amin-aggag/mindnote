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
    isFolder: v.boolean(),
    parentFolder: v.optional(v.string()),
    icon: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentFolder"]),

  userDocInfo: defineTable({
    userId: v.string(),
    title: v.string(),
    graphConnections: v.object({a: "abc"}),
    folderStructure: v.object([]),
  })
    .index("by_user", ["userId"])
})