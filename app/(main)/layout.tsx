"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import React from "react";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { PDFView } from "@/components/ui/pdfView";
// import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import { useViewSource } from "@/hooks/use-view-source";

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const viewSource = useViewSource();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg"/>
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return ( 
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation/>
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand/>
        {children}
      </main>
      {viewSource.isOpen ? <PDFView className="flex-1 h-[auto] overflow-y-auto"/> : null}
    </div>
   );
}
 
export default MainLayout;