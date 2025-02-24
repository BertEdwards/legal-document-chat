import { saveAs } from 'file-saver';
import { Document as DocxDocument, Packer, Paragraph } from 'docx';
import { jsPDF } from 'jspdf';
import { htmlToText } from 'html-to-text';

export type DocumentFormat = 'pdf' | 'docx' | 'txt';

export async function saveDocument(content: string, format: DocumentFormat, filename: string) {
  let blob: Blob;
  const cleanContent = htmlToText(content, {
    wordwrap: 130,
    preserveNewlines: true,
  });

  switch (format) {
    case 'pdf': {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const lineHeight = 7;
      const maxWidth = pageWidth - 2 * margin;

      // Split content into lines that fit within page width
      const lines = doc.splitTextToSize(cleanContent, maxWidth);
      let cursorY = margin;
      let currentPage = 1;

      // Process each line
      for (let i = 0; i < lines.length; i++) {
        if (cursorY + lineHeight > pageHeight - margin) {
          // Add new page if content exceeds current page
          doc.addPage();
          currentPage++;
          cursorY = margin;
        }
        doc.text(lines[i], margin, cursorY);
        cursorY += lineHeight;
      }

      blob = doc.output('blob');
      break;
    }
    case 'docx': {
      const doc = new DocxDocument({
        sections: [{
          properties: {},
          children: cleanContent.split('\n').map(para => 
            new Paragraph({
              text: para.trim(),
            })
          ),
        }],
      });
      blob = await Packer.toBlob(doc);
      break;
    }
    case 'txt':
    default: {
      blob = new Blob([cleanContent], { type: 'text/plain;charset=utf-8' });
    }
  }

  saveAs(blob, `${filename}.${format}`);
}