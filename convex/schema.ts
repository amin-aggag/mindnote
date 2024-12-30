import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    isFolder: v.boolean(),
    parentFolder: v.optional(v.string()),
    icon: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentFolder"]),

  folders: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentFolder: v.optional(v.string()),
    icon: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentFolder"])
})