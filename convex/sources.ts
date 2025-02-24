import { convexToJson, v } from "convex/values"
import {mutation, query} from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"
import { parseArgs } from "util"

type Source = {
  sourceName: string,
  fileUrl: string | null,
  storageId: Id<"_storage">
}

// Returns a stringified array with the user's sources
export const getSourcesList = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const sourcesList = await ctx.db.query("sources")
    .withIndex("by_user", (q) => q.eq("userId", userId)).collect();

    console.log("sourcesList = " + sourcesList);

    if (sourcesList === undefined) {
      return undefined;
    }

    if (!sourcesList) {
      throw new Error("Sources list not found");
    }

    if (sourcesList[0]  === undefined) {
      return undefined;
    }

    for (let i = 0; i < sourcesList.length; i++) {
      if (sourcesList[i].userId !== userId) {
        throw new Error("Not authorised");
      }
    }
    
    // Note, what is returned is a string, meaning that it has to be stringified before being used to render the UI

    return sourcesList[0].userSourcesList;
  }
});

/*
addSource

Adds a new source. This function includes the logic for if the user does not have custom sources yet and
if the user already has a source list in the database. For the second case, the case that if accidently
a user has 2 records in the database (there should only be 1 for each user) is also covered in terms of
authentication.
*/
export const addSource = mutation({
  args: { infoOfNewSource: v.string(),
    storageId: v.id("_storage")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const sourceFileUrl = await ctx.storage.getUrl(args.storageId);

    const sourcesList = await ctx.db.query("sources")
    .withIndex("by_user", (q) => q.eq("userId", userId)).collect();

    console.log("sourceName =" + args.infoOfNewSource);

    const infoOfNewSourceObject = JSON.parse(args.infoOfNewSource);

    let newSourcesList: Source[]; 

    if (!sourcesList[0]) {
      newSourcesList = [{sourceName: infoOfNewSourceObject[0].sourceName, fileUrl: sourceFileUrl, storageId: args.storageId}];
      const newSourcesListAsString = JSON.stringify(newSourcesList);
      console.log(newSourcesListAsString);

      const source = await ctx.db.insert("sources", {
        userId: userId,
        userSourcesList: newSourcesListAsString
      });

    } else if (sourcesList[0].userSourcesList === undefined) {

      for (let i = 0; i < sourcesList.length; i++) {
        if (sourcesList[i].userId !== userId) {
          throw new Error("Not authorised");
        }
      }

      const sourceId = sourcesList[0]._id;

      newSourcesList = [{sourceName: infoOfNewSourceObject[0].sourceName, fileUrl: sourceFileUrl, storageId: args.storageId}];
      const newSourcesListAsString = JSON.stringify(newSourcesList);
      console.log(newSourcesListAsString);
      const source = await ctx.db.patch(sourceId, {userSourcesList: newSourcesListAsString});

      // return source;

    } else if (sourcesList[0].userSourcesList !== undefined) {

      for (let i = 0; i < sourcesList.length; i++) {
        if (sourcesList[i].userId !== userId) {
          throw new Error("Not authorised");
        }
      }

      const sourceId = sourcesList[0]._id;

      const userSourcesList = JSON.parse(sourcesList[0].userSourcesList);
      userSourcesList[0].push({sourceName: infoOfNewSourceObject[0].sourceName, fileUrl: sourceFileUrl, storageId: args.storageId});
      const userSourcesListAsString = JSON.stringify(userSourcesList[0]);
      console.log(userSourcesListAsString);
      const source = await ctx.db.patch(sourceId, {userSourcesList: userSourcesListAsString});

      // return source;
    }
  }
});