'use client';

import { useState, useEffect } from 'react';

export default function PDFViewerSection() {
  const [PDFComponents, setPDFComponents] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    // Load react-pdf only on client side
    import('react-pdf').then((reactPdf) => {
      // Use the matching version 5.4.296
      const workerSrc = `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;
      
      // @ts-ignore
      reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      
      setPDFComponents({
        Document: reactPdf.Document,
        Page: reactPdf.Page
      });
      setWorkerReady(true);
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  if (!PDFComponents || !workerReady) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading PDF viewer...</p>
      </div>
    );
  }

  const { Document, Page } = PDFComponents;

  return (
    <div className="h-full w-full overflow-auto bg-gray-100 flex flex-col items-center py-2 sm:py-4">
      <Document
        file="/files/kshitijfinalresume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600 text-sm sm:text-base">Failed to load PDF</p>
          </div>
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className="mb-2 sm:mb-4 shadow-lg"
            width={typeof window !== 'undefined' && window.innerWidth < 640 ? window.innerWidth - 32 : window.innerWidth < 768 ? 600 : 800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
