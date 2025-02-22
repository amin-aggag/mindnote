"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import React from 'react';

function PdfComp(props: any) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
           <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
    </div>
  );
}
export default PdfComp;

export const PDFView = ({ className }: {className: string}) => {
  // const pdfFile = useQuery()

  return (
    <div className={className}>
      PDFView
      <PdfComp/>
    </div>
  )
}