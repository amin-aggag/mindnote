"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import React from 'react';
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";import { pdfjs } from 'react-pdf';

export const PdfComp = ({ pdfUrl }: {pdfUrl: string | null | undefined}) => {
  const [numPages, setNumPages] = useState<Number>();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: {numPages: Number}) => {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
           {/* <p>
        Page {pageNumber} of {`${numPages}`}
      </p> */}
      {/* <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={true}
                renderAnnotationLayer={false}
                key={page}
              />
            );
          })}
      </Document> */}
    </div>
  );
}