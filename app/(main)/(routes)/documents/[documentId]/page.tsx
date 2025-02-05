"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Usable, use } from 'react';

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    /* before it was: documentId: params.documentId, however this will be changed soon */
    /* I tried documentId: use(params.documentId as unknown as Usable<Id<"documents">>) but this error still came up:
      A param property was accessed directly with `params.documentId`. `params` is now a Promise and should be unwrapped with `React.use()` before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration but in a future version you will be required to unwrap `params` with `React.use()`.
    Edit by Amin on 6/2/25: No worries, this is now fixed as I have found the solution: make the
    params type a Promise<> and then use the "use" function on that. It works now.
    */
    documentId: use(params).documentId,
  });

  if (document === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]"/>
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
   );
}
 
export default DocumentIdPage;