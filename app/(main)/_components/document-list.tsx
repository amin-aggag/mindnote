/* trunk-ignore-all(prettier) */
"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      /* what does this next line even mean?!! timestamp for this was 3:26:00 ohhhh I get it now, it's selecting the specific documentId we have inside this object and assigning it the value of (!prevExpanded[documentId]). WOW!*/
      [documentId]: !prevExpanded[documentId]
    }));
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  }

  // In Convex, a type of undefined means it's loading. A failed query will return NULL instead. This is why a comparison to undefined is made for loading the skeleton. - Me 31/12/24
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style = {{paddingLeft: level ? `${(level * 12 + 25)}px` : undefined}}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {/* if the current document_id is expanded (which is computed by seeing if it's Id in the expanded array is set to true) render another component inside of it recursively*/}
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  )
}