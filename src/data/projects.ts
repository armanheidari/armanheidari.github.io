export type ProjectCategory =
  | 'Machine Learning'
  | 'Data Systems'
  | 'Hardware Systems'
  | 'Reinforcement Learning'
  | 'Full-Stack';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  year: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "algan-predictive-maintenance",
    title: "Industrial Predictive Maintenance & Anomaly Detection",
    subtitle: "Adversarially Learned Anomaly Detection on IoT Telemetry",
    category: "Machine Learning",
    description: "Developed a real-time anomaly detection pipeline for multi-channel industrial IoT telemetry (chillers), combining deep generative modeling (ALGAN: Adjusted-LSTM GAN) and sequential state forecasting.",
    highlights: [
      "Deployed Adjusted-LSTM GAN (ALGAN) framework alongside deep neural predictors to capture nominal operational dynamics",
      "Integrated automated Genetic Algorithm (GA) to synthesize and optimize fuzzy inference rules, dynamically assigning anomaly severity scores",
      "Mitigated false alarm rates, lowered diagnostic latency, and prevented abnormal energy spikes from operational degradation"
    ],
    techStack: ["PyTorch", "LSTM-GAN", "Genetic Algorithms", "Fuzzy Logic", "IoT Telemetry", "Docker"],
    metrics: "Lowered Diagnostic Latency",
    year: "2024 - 2025",
    featured: true
  },
  {
    id: "multi-agent-support-system",
    title: "Autonomous Multi-Agent Support & Monitoring Ecosystem",
    subtitle: "9-Agent Collaborative Workflow with Dense RAG & Reflection Guardrails",
    category: "Machine Learning",
    description: "Architected a 9-agent collaborative workflow using LangChain and Llama-3.1 to manage multi-turn dialogues, real-time intent dispatching, and automated issue resolution.",
    highlights: [
      "Multi-Agent Orchestration: 9-agent collaborative pipeline with specialized intent dispatchers, resolvers, and central monitoring",
      "Dense Retrieval-Augmented Generation (RAG) using FAISS vector indexing with a reflective agent to inspect and polish responses",
      "Constructed topic boundary enforcement guardrails and streaming categorized telemetry extraction"
    ],
    techStack: ["LangChain", "Llama-3.1", "FAISS", "RAG", "Multi-Agent Systems", "Python"],
    metrics: "9-Agent Orchestration",
    year: "2024 - 2025",
    featured: true
  },
  {
    id: "isle-scientific-explorer",
    title: "ISLE — Intelligent Scientific Literature Explorer",
    subtitle: "Hybrid Retrieval & Heterogeneous Knowledge Graph Engine",
    category: "Machine Learning",
    description: "Architected a scientific discovery engine integrating hybrid retrieval (BM25 + dense sentence embeddings via Reciprocal Rank Fusion) and automated semantic clustering (BERTopic/NMF).",
    highlights: [
      "Hybrid search fusing BM25 lexical retrieval with dense embeddings using Reciprocal Rank Fusion (RRF)",
      "Automated semantic clustering via BERTopic and Non-Negative Matrix Factorization (NMF)",
      "Engineered heterogeneous knowledge graph mapping multi-hop entity relationships across arXiv and OpenAlex datasets"
    ],
    techStack: ["Python", "FastAPI", "Next.js", "Sentence-Transformers", "BERTopic", "Knowledge Graphs", "BM25", "OpenAlex"],
    githubUrl: "https://github.com/armanheidari/ISLE",
    liveUrl: "https://arxiv.org/abs/2512.12760",
    metrics: "Hybrid RRF + Knowledge Graph",
    year: "2025",
    featured: true
  },
  {
    id: "kharidyar-chatbot",
    title: "Kharidyar (خریدیار) — Persian Conversational E-Commerce Bot",
    subtitle: "End-to-End Persian Conversational AI & Dynamic Shopping Cart Engine",
    category: "Machine Learning",
    description: "An end-to-end intelligent conversational AI assistant designed for online retail and grocery shopping in Persian, integrating custom Persian NLU, fine-tuned ParsBERT slot filling, dynamic cart management, and LLaMA-3 customer support.",
    highlights: [
      "Custom Persian NLU pipeline combining Hazm text preprocessing with LinearSVC intent classification and sentiment analysis",
      "Fine-tuned ParsBERT (BERT-Base) model on TensorFlow/Keras for multi-slot Named Entity Recognition (items, units, quantities)",
      "Multi-turn dialogue manager syncing live with MySQL 8.4 inventory, dynamic cart modification, and LLaMA-3-70B RAG customer support",
      "FastAPI server with real-time WebSocket token streaming (/ws) and interactive responsive RTL web interface"
    ],
    techStack: ["FastAPI", "ParsBERT", "TensorFlow", "LangChain", "LLaMA-3", "Hazm", "MySQL", "WebSockets"],
    githubUrl: "https://github.com/armanheidari/kharidyar-chatbot",
    metrics: "ParsBERT NER + LLaMA-3 RAG",
    year: "2024",
    featured: true
  },
  {
    id: "digisage",
    title: "DigiSage — Persian E-Commerce RAG & FAQ Assistant",
    subtitle: "Semantic Search, Hybrid Vectorization & Grounded Llama 3.3 70B Generation",
    category: "Machine Learning",
    description: "An intelligent Persian-language Retrieval-Augmented Generation (RAG) assistant and semantic FAQ chatbot built for Digikala customer queries, handling colloquial phrasing, spelling variations, and customer service inquiries.",
    highlights: [
      "Persian text preprocessing pipeline using Hazm, statistical TF-IDF, and dense multilingual sentence embeddings (LaBSE)",
      "K-Nearest Neighbors semantic retrieval coupled with grounded generation via Llama 3.3 70B Instruct (Together AI)",
      "Automated data augmentation engine with T5-based paraphrasing, round-trip translation, and MLflow experiment tracking"
    ],
    techStack: ["Flask", "Flask-SocketIO", "Sentence-Transformers", "LaBSE", "Llama-3.3-70B", "MLflow", "Hazm", "T5"],
    githubUrl: "https://github.com/armanheidari/Digisage",
    metrics: "Hybrid LaBSE + Llama 3.3 70B",
    year: "2024 - 2025",
    featured: false
  },
  {
    id: "summarizing-pipeline",
    title: "Multimodal Summarization Pipeline",
    subtitle: "Audio/Video Speech-to-Text Transcription & Thematic LLM Summarization",
    category: "Machine Learning",
    description: "An end-to-end multimodal pipeline designed to process video, audio, or text inputs and generate concise, structured summaries using speech recognition and modern large language models.",
    highlights: [
      "Multi-format ingestion pipeline handling video, audio, and text with automated FFmpeg conversion and validation",
      "Offline Speech-to-Text transcription in English and Persian powered by Vosk acoustic models",
      "Configurable thematic and priority-based summarization workflows integrated with LLM clients (OpenRouter, Together AI)"
    ],
    techStack: ["FastAPI", "Python", "Vosk STT", "FFmpeg", "OpenRouter", "Together AI", "NLP"],
    githubUrl: "https://github.com/armanheidari/Summarizing-Pipeline",
    liveUrl: "https://vimeo.com/1057146672/22fd5e4fe0?share=copy",
    metrics: "Multimodal Audio/Video STT",
    year: "2024 - 2025",
    featured: false
  },
  {
    id: "randomuser-pipeline",
    title: "Randomuser Real-Time Streaming Data Pipeline",
    subtitle: "Decoupled Event-Driven Ingestion, Kafka Processing & Multi-Database Storage",
    category: "Data Systems",
    description: "A production-grade containerized data pipeline built to continuously ingest, stream, transform, and persist high-velocity event streams into relational and administrative databases.",
    highlights: [
      "Event-driven messaging and producer-consumer decoupling via Apache Kafka and Docker Compose",
      "Multi-stage Kafka consumers executing chronological timestamping and synthetic data enrichment using Faker",
      "Dual database persistence in PostgreSQL and NocoDB, backed by crontab automation, WAL archiving, and 5-min backups"
    ],
    techStack: ["Apache Kafka", "Docker Compose", "PostgreSQL", "NocoDB", "Python", "Bash"],
    githubUrl: "https://github.com/armanheidari/Randomuser-Data-Pipeline",
    metrics: "Fault-Tolerant Kafka Streaming",
    year: "2023 - 2024",
    featured: false
  },
  {
    id: "tsetmc-etl",
    title: "TSETMC Financial Market ETL & Analytics Engine",
    subtitle: "Automated Market Ingestion, Data Lake Conversion & Visual Analytics",
    category: "Data Systems",
    description: "An automated financial engineering and data pipeline tool that extracts, transforms, and analyzes Tehran Stock Exchange (TSETMC) market data with structured reporting.",
    highlights: [
      "Automated financial data extraction from TSETMC staging into a structured CSV datalake",
      "Analytical computation engine generating self-contained visual HTML market reports",
      "CLI execution control via argparse alongside split-level error and info execution logging"
    ],
    techStack: ["Python", "ETL", "Data Analytics", "Pandas", "HTML Reporting", "Argparse"],
    githubUrl: "https://github.com/armanheidari/TSETMC-ETL-Analysis",
    metrics: "Automated Financial ETL",
    year: "2023",
    featured: false
  },
  {
    id: "basic-computer",
    title: "M. Morris Mano 16-Bit Basic Computer Simulation",
    subtitle: "Discrete Logic Hardware Architecture & Micro-Operation Simulation in Proteus",
    category: "Hardware Systems",
    description: "A complete hardware simulation of the classical 16-bit accumulator-based Basic Computer described by M. Morris Mano in Computer System Architecture, built and simulated in Proteus Design Suite.",
    highlights: [
      "Decomposed and integrated 7 core subsystems: Common Bus (74151 MUX), 4K×16 Memory (27512 chips), Control Unit, and ALU",
      "Hardwired combinational control unit with 3-to-8 opcode decoder (D0-D7) and 4-bit Sequence Counter (T0-T15 timing cycles)",
      "Preloaded test program assembled directly into Mano machine code binary images (DATA.BIN, DATA2.BIN) to verify all CPU execution paths"
    ],
    techStack: ["Proteus Design Suite", "Computer Architecture", "Digital Logic", "Assembly", "Hardware Simulation"],
    githubUrl: "https://github.com/armanheidari/Basic-Computer",
    metrics: "16-Bit Discrete Logic CPU Simulation",
    year: "2023",
    featured: false
  }
];
