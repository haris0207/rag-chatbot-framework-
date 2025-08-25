// training/ingest.ts

import "dotenv/config";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { addDocuments, resetCollection } from "../lib/retriever";
import { loadDocument } from './documentLoader';

// Get the folder name from the command-line arguments
const folderName = process.argv[2];
export interface Chunk {
  id: string;
  text: string;
  metadata?: Record<string, any>;
}
console.log(folderName)
if (!folderName) {
  console.error("❌ Please provide a folder name to ingest. Example: npx tsx training/ingest.ts healthcare");
  process.exit(1);
}

// ESM-compatible way to get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)// ... existing code ...


// ... existing code ...)
const __dirname = path.dirname(__filename);

// ✅ Explicitly define the project root
// This ensures we always resolve paths from the 'aibot' directory
const projectRoot = path.resolve(__dirname, '..'); 
console.log(projectRoot)

async function ingestData() {
  try {
    // Reset the specific collection to start fresh
    await resetCollection(folderName);
    console.log(`Database collection '${folderName}' has been reset for new ingestion.`);

    // ✅ Define the path to the specified industry data folder relative to projectRoot
    const dataPath = path.join(projectRoot, `data/${folderName}`);
    
    // Add a debug log to verify the dataPath
    console.log(`Attempting to read from dataPath: ${dataPath}`);

    const files = await fs.readdir(dataPath);

    console.log(`Found ${files.length} file(s) in '${folderName}'.`);

      const allChunks: Chunk[] = [];

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    for (const file of files) {
      const filePath = path.join(dataPath, file);
      console.log(`Processing file: ${file} at path: ${filePath}`); // Debug log for full file path
      
      const rawText = await loadDocument(filePath);

      const chunks = await splitter.splitText(rawText);

      chunks.forEach((chunk, index) => {
        allChunks.push({
          id: `${folderName}-${path.parse(file).name}-${index}`,
          text: chunk,
          metadata: {
            source: file,
            industry: folderName,
            chunk_index: index,
          }
        });
      });
    }

    if (allChunks.length > 0) {
      await addDocuments( allChunks);
      console.log(`✅ Successfully ingested ${allChunks.length} chunks from '${folderName}'.`);
    } else {
      console.log(`⚠️ No documents found or chunks generated to ingest in '${folderName}'.`);
    }

  } catch (error) {
    console.error(`Ingestion failed for '${folderName}':`, error);
  }
}

// Execute the ingestion process
ingestData();
