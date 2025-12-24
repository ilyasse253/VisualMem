# Quickstart Guide

This guide will walk you through the installation and setup of VisualMem.

## 📋 Prerequisites

- **Python**: 3.12
- **Node.js**: v20.x or higher (Tested with v23.9.0)
- **npm**: 10.x or higher (Tested with 10.9.2)
- **VLM Service**: An OpenAI-compatible multimodal LLM service (e.g., vLLM, Ollama, or OpenAI API).
- **Hardware**: 
    - **GPU**: Minimum **4GB VRAM** for local inference (CLIP/OCR). 8GB+ recommended for reranker enabled.
    - **OS**: macOS (Apple Silicon) or Linux.

## 🛠️ Step 1: Backend Configuration

### 1. Clone the Repository
```bash
git clone https://github.com/DyingCoderLin/VisualMem.git
cd VLM-research
```

### 2. Create and Activate Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or you can create by conda if you like
```

### 3. Install Python Dependencies
Choose the requirement file based on your OS:
- **macOS**:
  ```bash
  pip install -r requirements_macos.txt
  ```
- **Linux (CUDA)**:
  ```bash
  pip install -r requirements_linux_cuda.txt
  ```

### 4. Configure Environment Variables
Copy the example environment file and edit it:
```bash
cp env.example .env
```
Edit the `.env` file to configure your storage and retrieval preferences. 

**Rerank Configuration (Optional):**
If you have enough VRAM (8GB+), you can enable a second-stage reranker for better accuracy:
```ini
# Enable a second-stage reranking using a multimodal model
ENABLE_RERANK=true
# Model used for reranking (e.g. a smaller VLM)
RERANK_MODEL=Qwen/Qwen3-VL-2B-Instruct
```

## 🧠 Step 2: Start VLM Service

VisualMem requires an OpenAI-compatible VLM service to understand screenshots. 

### 1. Start your VLM Server
You can use any server that supports the OpenAI API format.

#### Option A: Local Deployment (Recommended)
You can use [vLLM](https://github.com/vllm-project/vllm) to host a model locally:
```bash
# Example using Qwen3-VL
vllm serve Qwen/Qwen3-VL-8B-Instruct --port 8081
```

#### Option B: Cloud API
You can also use commercial APIs like OpenAI GPT-5 or Claude 3.5 Sonnet. 
*Note: Using cloud APIs can be costly due to the high volume of screenshots.*

### 2. Update `.env` with VLM Details
Once your VLM service is running, update the following keys in your `.env` file:
```ini
# VLM API Configuration
VLM_API_URI=http://localhost:8081  # VLM service address
VLM_API_MODEL=Qwen/Qwen3-VL-8B-Instruct  # Your VLM Model name
VLM_API_KEY=None # Set your API key if using cloud services
```

## 🚀 Step 3: Launch VisualMem

The frontend handles screen capture and UI, while automatically managing the backend service for indexing and retrieval.

### 1. Navigate to Frontend Directory
```bash
cd pro_gui
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Start the Application
For development (with hot-reload):
```bash
npm run dev
```
*Note: Use `npm run dev:no-devtools` to hide the Chrome DevTools.*

The VisualMem Pro GUI will launch, and the backend service will start automatically in the background.

## 📖 Usage Guide

1.  **Start Recording**: Click the "Start Recording" button at the top of the GUI. The system will automatically capture frames based on screen changes.
2.  **Browse Timeline**: On the Home (Timeline) page, scroll horizontally to view screenshots from each day.
3.  **Smart Search**: Enter any query in the search bar (e.g., "The React documentation I was reading earlier"). The system combines vector search and VLM to provide answers and relevant screenshots.
4.  **Real-time Tracing**: Switch to the "Real-time Tracing" page to ask questions about your current screen content instantly.

## ❓ Troubleshooting

- **Images not displaying**: Ensure the backend service is running and the storage path in `.env` is correct.
- **VLM connection failed**: Verify that `VLM_API_URI` is accessible from your machine.

---
Back to [README.md](./README.md)

