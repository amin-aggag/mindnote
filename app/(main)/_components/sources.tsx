import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useViewSource } from "@/hooks/use-view-source"
import { useQuery } from "convex/react"

type Source = {
  sourceName: string,
  fileUrl: string | null,
  storageId: Id<"_storage">
}

export const SourcesList = () => {
  const stringifiedSourcesList = useQuery(api.sources.getSourcesList);
  const viewSource = useViewSource();

  let sourcesList;

  if (stringifiedSourcesList === undefined) {
    sourcesList = undefined;
    return (
      <div></div>
    )
  }
  else if (stringifiedSourcesList) {
    sourcesList = JSON.parse(stringifiedSourcesList);
    console.log("stringifiedList = " + sourcesList);
    console.log(sourcesList);

    // i is for the key so that React does not throw an error that a unique key is not given. - Amin 24/2/25
    let i = 0;

    return (
      <div>
        {sourcesList.map((source: Source) => (
          <p className="font-medium text-sm ml-4 mb-0.5 text-muted-foreground cursor-pointer" key={i++} onClick={() => {
            if (viewSource.fileBeingViewedUrl === source.fileUrl || viewSource.isOpen === false) {
              viewSource.toggle();
            }
            viewSource.setFileBeingViewed(source.fileUrl);
          }}>{source.sourceName}</p>
        ))}
      </div>
    )
  }

}