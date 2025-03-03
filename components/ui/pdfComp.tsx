"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import React from 'react';
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

export const PdfComp = ({ pdfUrl }: {pdfUrl: string | null | undefined}) => {
  const [numPages, setNumPages] = useState<Number>();
  // const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: {numPages: Number}) => {
    setNumPages(numPages);
  }

  if (pdfUrl == null || pdfUrl == undefined) {
    return (
      <div>
        Loading pdf...
      </div>
    )
  } else {
    return (
      <div className="pdf-div">
            {/* <p>
          Page {pageNumber} of {`${numPages}`}
        </p> */}
        <Document file={{url: `${pdfUrl}`}} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages &&
          [ ...Array(numPages)].map((x, i) => (
            <>
              <Page
                renderAnnotationLayer={false}
                pageNumber={i + 1}
                renderMode="canvas"
              />
              <br/>
            </>
          ))}
        </Document>
      </div>
    );
  }
}