# rag-chatbot-framework- 🚀 - An Open-Source, Industry-Adaptable AI Chatbot Framework

## Overview

OpenChatForge is a versatile, open-source AI chatbot framework designed to be easily integrated and customized for various industry-specific needs. Built with Next.js, Google Gemini, and Upstash Vector, it allows businesses to deploy intelligent, knowledge-aware chatbots trained on their own data, without needing deep AI expertise.

**Key Features:**

* **Modular Architecture:** Separate frontend UI, backend API, and core AI logic.
* **Retrieval-Augmented Generation (RAG):** Answers questions using your specific documents (FAQs, policies, manuals) for accurate, grounded responses.
* **Conversation Memory:** Maintains context within chat sessions for natural interactions.
* **Industry Adaptability:** Easily switch between different knowledge bases (e.g., Customer Support, Healthcare, Finance) by ingesting new data.
* **Open Source:** Encourages community contributions and allows for self-hosting and further customization.

---

## Getting Started

First, ensure you have the **Prerequisites** installed, then follow the setup steps.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js (v18.x or higher) & npm:** [Download Node.js](https://nodejs.org/en/download/)
* **Python (v3.9 or higher) & pip:** [Download Python](https://www.python.org/downloads/)
* **Git:** [Download Git](https://git-scm.com/downloads)
* **Google Gemini API Key:** Get one from [Google AI Studio](https://aistudio.google.com/).
* **Upstash Vector Database:** You'll need a cloud-based vector database for persistent storage.
    * Create an account and a new Vector database at [Upstash](https://upstash.com/).
    * Obtain your **REST URL** and **REST Token**.
 
### 1. Clone the Repository

```bash
git clone https://github.com/haris0207/rag-chatbot-framework-.git
cd rag-chatbot-framework-
```
## 2. Environment Setup
Create a .env file in the root of your project and add your API keys and Upstash Vector credentials:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
CHROMA_URL=your_upstash_vector_rest_url_here # e.g., [https://xxxx.upstash.io](https://xxxx.upstash.io)
CHROMA_TOKEN=your_upstash_vector_rest_token_here # e.g., xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
3. Install Dependencies
Node.js Dependencies
```Bash

npm install
# Also install tsx if you haven't already
npm install --save-dev tsx
```
Python Dependencies (for local ChromaDB during development/testing - Optional for live deployment with Upstash)
While we're using Upstash for deployment, you might still want a local Chroma setup for some specific tests or local development. If so:

```Bash

# Create a virtual environment
python -m venv .venv
```
# Activate the virtual environment
# On Windows (PowerShell):
```
.\.venv\Scripts\Activate.ps1
# On macOS/Linux:
source .venv/bin/activate
```
# Install ChromaDB
```
pip install chromadb
```
4. Ingest Industry Data
This step loads your documents into your Upstash Vector database.

Prepare your data: Create a folder (e.g., data/resume/) and place your documents (PDFs, Markdown, TXT) inside.

Run the ingestion script:

```Bash

npx tsx training/ingest.ts resume # Replace 'resume' with your data folder name
You should see output confirming the documents were ingested into Upstash Vector.
```
5. Run the Next.js Application Locally
Open a terminal in your project root and start the Next.js development server:

```Bash

npm run dev
Your chatbot will now be accessible at http://localhost:3000.
```
How to Use the Chatbot (Local Development)
Open your browser to http://localhost:3000.

Interact with the chatbot. 

Type a question related to the ingested data.

The chatbot will retrieve relevant information from your Upstash Vector database and provide a grounded answer.

Project Structure
```rag-chatbot-framework-/
├── README.md                # Project overview & setup instructions
├── LICENSE                  # Open-source license (Apache 2.0 recommended)
├── package.json             # Node.js dependencies and scripts
├── .env                     # Environment variables (API keys, etc.)
├── .gitignore               # Files/folders to ignore in Git
├── next.config.ts
├── tsconfig.json
│
├── app/                     # Next.js App Router
│   ├── api/
│   │   └── chat/route.ts    # API endpoint for chatbot (RAG + Memory)
│   ├── page.tsx             # Main UI for your portfolio content
│   └── layout.tsx           # Global UI layout
│
├── components/
│   ├── ChatUI.tsx           # The main chat interface component (widget style)
│   └── ChatToggleButton.tsx # The floating button to open the chat widget
│
├── lib/                     # Core backend logic
│   ├── llm.ts               # Wrapper for Gemini LLM calls
│   ├── memory.ts            # Conversation memory handler
│   ├── pipeline.ts          # Orchestrates RAG (Retriever + LLM)
│   └── retriever.ts         # Handles Upstash Vector interaction (embeddings, add, query)
│
├── data/                    # Industry-specific knowledge documents (e.g., resume)
│   └── resume/
│       └── your_resume.pdf
│
└── training/                # Scripts for data processing
    ├── documentLoader.ts    # Utility for loading various document types (PDF, TXT)
    └── ingest.ts            # Script to load documents into Upstash Vector
```
Contributing
We welcome contributions! Please see CONTRIBUTING.md (to be created) for guidelines.

License
This project is licensed under the Apache 2.0 License - see the LICENSE file for details.






