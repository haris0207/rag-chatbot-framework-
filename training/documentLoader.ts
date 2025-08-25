// training/documentLoader.ts
import fs from 'fs/promises';
import path from 'path';
import pdf from 'pdf-parse';

export async function loadDocument(filePath: string): Promise<string> {
  const fileExtension = path.extname(filePath).toLowerCase();

  switch (fileExtension) {
    case '.md':
    case '.txt':
      return fs.readFile(filePath, 'utf-8');



    case '.jsonl':
      // ✅ Special handling: flatten Q&A pairs into text
      const raw = await fs.readFile(filePath, 'utf-8');
      const lines = raw.trim().split('\n');
      const entries = lines.map((line) => {
        const { prompt, completion } = JSON.parse(line);
        return `Q: ${prompt}\nA: ${completion}`;
      });
      return entries.join('\n\n'); // return as one big string for splitter

    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}
