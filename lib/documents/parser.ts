export interface ParsedDocument {
  text: string;
  pages: Array<{ number: number; text: string }>;
}

export async function parsePdf(buffer: Buffer): Promise<ParsedDocument> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse: (buf: Buffer) => Promise<{ text: string; numpages: number }> = require("pdf-parse/lib/pdf-parse");
  const data = await pdfParse(buffer);

  const fullText = data.text;
  const pageTexts: Array<{ number: number; text: string }> = [];

  // pdf-parse doesn't split per page natively; approximate by line count
  const lines = fullText.split("\n");
  const linesPerPage = Math.max(1, Math.ceil(lines.length / (data.numpages || 1)));
  for (let i = 0; i < data.numpages; i++) {
    const start = i * linesPerPage;
    pageTexts.push({
      number: i + 1,
      text: lines.slice(start, start + linesPerPage).join("\n").trim(),
    });
  }

  return { text: fullText, pages: pageTexts };
}

export async function parseDocx(buffer: Buffer): Promise<ParsedDocument> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return {
    text: result.value,
    pages: [{ number: 1, text: result.value }],
  };
}

export async function extractText(buffer: Buffer, mime: string): Promise<ParsedDocument> {
  if (mime === "application/pdf") return parsePdf(buffer);
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return parseDocx(buffer);
  throw new Error(`Unsupported MIME type: ${mime}`);
}
