"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import React from 'react';
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PdfComp } from "./pdfComp";
import { EmbedPDF } from '@simplepdf/react-embed-pdf';
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

export const PDFView = ({ className }: {className: string}) => {
  // const pdfFile = useQuery()
  const fileUrl = useQuery(api.documents.getFileUrl, { storageId: "kg21c5hacqqcm72zgeafkh3twh7asej2" as Id<"_storage">});
  console.log("fileURL = " + fileUrl);
  if (fileUrl === null || fileUrl === undefined) {
    return <p>Loading</p>;
  } else {
    return (
      <div className={className}>
        PDFView
        <object data={`${fileUrl}`} type="application/pdf" className="pt-8 h-[100%] w-[100%]">
          <p>Alternative text - include a link <a href={`${fileUrl}`}>to the PDF!</a></p>
        </object>
      </div>
    )
  }
}