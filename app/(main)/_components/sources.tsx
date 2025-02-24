import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

type Source = {
  sourceName: string,
  fileUrl: string | null,
  storageId: Id<"_storage">
}

export const SourcesList = () => {
  const stringifiedSourcesList = useQuery(api.sources.getSourcesList);

  let sourcesList;

  if (stringifiedSourcesList === undefined) {
    sourcesList = undefined;
  }
  else if (stringifiedSourcesList) {
    sourcesList = JSON.parse(stringifiedSourcesList);
  }

  console.log("sourcseList = " + sourcesList);

  return (
    <div>
      { sourcesList ? sourcesList.map((source: Source) => (
        <p className="font-medium text-sm ml-4 mb-0.5 text-muted-foreground">{source.sourceName}</p>
      )) : <div></div>}
    </div>
  )
}