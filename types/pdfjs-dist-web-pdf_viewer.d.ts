// types/pdfjs-dist-web-pdf_viewer.d.ts
declare module 'potato' {
  export class PDFTextLayerBuilder {
    constructor(options: {
      textLayerDiv: HTMLElement;
      pageIndex: number;
      viewport: any;
      eventBus?: any;
    });
    setTextContent(textContent: any): void;
    render(): void;
  }
}
