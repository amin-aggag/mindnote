"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Usable, use, useEffect, useState } from 'react';
import { Cover } from "@/components/ui/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/components/ui/editor";
import { PartialBlock } from "@blocknote/core";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const currentDocumentId = use(params).documentId;

  const document = useQuery(api.documents.getById, {
    /* before it was: documentId: params.documentId, however this will be changed soon */
    /* I tried documentId: use(params.documentId as unknown as Usable<Id<"documents">>) but this error still came up:
      A param property was accessed directly with `params.documentId`. `params` is now a Promise and should be unwrapped with `React.use()` before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration but in a future version you will be required to unwrap `params` with `React.use()`.
    Edit by Amin on 6/2/25: No worries, this is now fixed as I have found the solution: make the
    params type a Promise<> and then use the "use" function on that. It works now.
    */
    documentId: currentDocumentId,
  });

  const coverImageUrl = useQuery(api.documents.getCoverImageUrl, {
    documentId: use(params).documentId,
  });

  const update = useMutation(api.documents.update);

  const onContentChange = (content: string) => {
    update({
      id: currentDocumentId,
      content
    });
  };

  const [initialContentInEditor, setInitialContentInEditor] = useState<string | undefined>();

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton/>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]"/>
            <Skeleton className="h-4 w-[80%]"/>
            <Skeleton className="h-4 w-[40%]"/>
            <Skeleton className="h-4 w-[60%]"/>
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return <div>Not found</div>;
  }


  return (
    <div className="pb-40">
      <Cover url={coverImageUrl ? coverImageUrl : undefined}/>
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          onContentChange={onContentChange}
          initialContent={document.content}
          documentId={currentDocumentId}
        />
      </div>
    </div>
   );
}
 
export default DocumentIdPage;