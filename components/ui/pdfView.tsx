"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import React from 'react';
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PdfComp } from "./pdfComp";
// import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import { useViewSource } from "@/hooks/use-view-source";
import PdfViewer from "./pdfjsviewer";
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

type Source = {
  sourceName: string,
  fileUrl: string | null,
  storageId: Id<"_storage">
}

export const PDFView = ({ className }: {className: string}) => {
  // const pdfFile = useQuery()

  const viewSource = useViewSource();
  const fileBeingViewedUrl = viewSource.fileBeingViewedUrl;

  const sourcesListStringified = useQuery(api.sources.getSourcesList);

  if (sourcesListStringified === undefined || sourcesListStringified === null) {
    return <p>Loading</p>;
  } else {
    const sourcesList = JSON.parse(sourcesListStringified);

    console.log(fileBeingViewedUrl);

    if (fileBeingViewedUrl === undefined || fileBeingViewedUrl === null) {
      return (
        <div>
          No source selected
        </div>
      )
    }

    return (
      <div className={className} style={{marginTop: "20px"}}>
        <object data={`${fileBeingViewedUrl}`} type="application/pdf" className="pt-8 h-[100%] w-[100%]">
          <p>Alternative text - include a link <a href={`${fileBeingViewedUrl}`}>to the PDF!</a></p>
        </object>
      </div>
      // <PdfViewer url={`${fileBeingViewedUrl}`}/>
      // <PdfComp pdfUrl={`${fileBeingViewedUrl}`}/>
    )
  }
}