// components/PdfViewer.tsx

import React, { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import type { TextContent } from 'pdfjs-dist/types/src/display/api';

// Import PDFTextLayerBuilder from PDF.js’s viewer.
// (Make sure you have the appropriate types installed or use ts-ignore if needed.)
// @ts-ignore
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer';

// Set the path for the PDF.js worker. Adjust the path if necessary.
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);

  // Load the PDF document once the URL changes.
  useEffect(() => {
    const loadingTask = getDocument(url);
    loadingTask.promise
      .then((pdf: PDFDocumentProxy) => {
        setPdfDoc(pdf);
      })
      .catch((err) => {
        console.error('Error loading PDF:', err);
      });
  }, [url]);

  // Handle text selection across pages.
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && selection.toString().trim() !== '') {
      const range = selection.getRangeAt(0);
      // Query all text spans rendered by PDF.js.
      const spans = Array.from(document.querySelectorAll('.textLayer span'));
      // Filter spans that intersect with the selection range.
      const selectedSpans = spans.filter((span) => range.intersectsNode(span));
      // For each span, compute a rough line number and retrieve its page number.
      const selectedInfo = selectedSpans.map((span: any) => {
        const page = span.dataset.page;
        // Use offsetTop of the span relative to its positioned container.
        const top = span.offsetTop;
        const computedStyle = window.getComputedStyle(span);
        // Try to get a numeric line height; default to 14 if unavailable.
        const lineHeight = parseFloat(computedStyle.lineHeight) || 14;
        const lineNumber = Math.floor(top / lineHeight) + 1;
        return { page, lineNumber, text: span.textContent };
      });
      console.log('Selection info:', selectedInfo);
      // You might choose to store or display selectedInfo as needed.
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ overflowY: 'scroll', height: '80vh', position: 'relative' }}
      onMouseUp={handleMouseUp}
    >
      {pdfDoc &&
        Array.from(new Array(pdfDoc.numPages), (_, index) => (
          <PdfPage key={index} pdfDoc={pdfDoc} pageNumber={index + 1} />
        ))}
    </div>
  );
};

interface PdfPageProps {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
}

export const PdfPage: React.FC<PdfPageProps> = ({ pdfDoc, pageNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the page from the PDF document.
    pdfDoc.getPage(pageNumber).then((page: PDFPageProxy) => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      // Set canvas dimensions to match the PDF page viewport.
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the PDF page into the canvas.
      const renderTask = page.render({
        canvasContext: context!,
        viewport,
      });

      renderTask.promise.then(() => {
        // Once the page is rendered, render the text layer.
        if (textLayerRef.current) {
          // Clear any previous content.
          textLayerRef.current.innerHTML = '';
          textLayerRef.current.style.width = `${viewport.width}px`;
          textLayerRef.current.style.height = `${viewport.height}px`;

          page.getTextContent().then((textContent: TextContent) => {
            const textLayerDiv = textLayerRef.current!;
            // Create a new PDFTextLayerBuilder instance.
            const textLayer = new TextLayerBuilder({
              textLayerDiv,
              pageIndex: pageNumber - 1,
              viewport,
              // Optional: you can pass an eventBus if needed.
            });
            // Set the text content and render the layer.
            textLayer.setTextContent(textContent);
            textLayer.render();

            // After rendering, add a data attribute for page number to each span.
            const spans = textLayerDiv.querySelectorAll('span');
            spans.forEach((span) => {
              span.dataset.page = pageNumber.toString();
            });
          });
        }
      });
    });
  }, [pdfDoc, pageNumber]);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      <div
        ref={textLayerRef}
        className="textLayer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none', // This ensures that text selection passes through.
        }}
      />
    </div>
  );
};

export default PdfViewer;
