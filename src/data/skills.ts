// src/data/skills.ts

export interface SkillItem {
  name: string;
  level: 'Core' | 'Proficient' | 'Familiar';
  badge?: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: 'brain' | 'bot' | 'code' | 'chart' | 'layout' | 'terminal';
  description: string; // Simple explanation for the hub card
  overview: string;    // Expanded overview for the dedicated page
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ml-dl",
    slug: "machine-learning-deep-learning",
    title: "Machine Learning & Deep Learning",
    shortTitle: "ML & Deep Learning",
    icon: "brain",
    description: "Deep learning architectures, generative models, anomaly detection, and reinforcement learning.",
    overview: "Comprehensive foundation in training, fine-tuning, and evaluating neural network architectures across vision, sequence modeling, and decision-making agents with deep reinforcement learning.",
    skills: [
      {
        name: "PyTorch",
        level: "Core",
        badge: "Primary",
        description: "Primary deep learning framework used for custom neural architectures, reinforcement learning environments, and academic research implementations."
      },
      {
        name: "TensorFlow & Keras",
        level: "Proficient",
        description: "Applied for foundational deep learning coursework, convolutional networks, and baseline reproducibility."
      },
      {
        name: "Scikit-learn",
        level: "Core",
        description: "Standard statistical machine learning algorithms, classification, regression, clustering, dimensionality reduction, and model evaluation pipelines."
      },
      {
        name: "Hugging Face Transformers",
        level: "Core",
        description: "Utilizing pretrained foundation models, tokenizers, parameter-efficient fine-tuning (PEFT/LoRA), and inference pipelines for natural language processing."
      },
      {
        name: "Deep Reinforcement Learning",
        level: "Core",
        badge: "Research",
        description: "Policy gradient methods, PPO, Actor-Critic architectures, reward modeling, and continuous action-space control."
      },
      {
        name: "Generative Models (GANs & LSTMs)",
        level: "Core",
        description: "Adversarial network architectures, generative time-series modeling (LSTM-GAN), and latent representation modeling."
      },
      {
        name: "Out-of-Distribution & Anomaly Detection",
        level: "Core",
        description: "Confidence estimation, Mahalanobis distance scoring, and spectral anomaly detection techniques in mission-critical settings."
      },
      {
        name: "Representation Learning",
        level: "Core",
        description: "Self-supervised feature extraction, contrastive embeddings, and latent representations for downstream classification."
      }
    ]
  },
  {
    id: "agentic-ai",
    slug: "agentic-ai-retrieval",
    title: "Agentic AI & Retrieval Systems",
    shortTitle: "Agentic AI & RAG",
    icon: "bot",
    description: "Multi-agent orchestration, dense vector indexing, and Retrieval-Augmented Generation pipelines.",
    overview: "Architecting autonomous LLM agents equipped with deterministic tool execution, vector retrieval backends, and multi-step reasoning workflows.",
    skills: [
      {
        name: "LangChain",
        level: "Core",
        badge: "Agentic",
        description: "Framework for building multi-step conversational agent chains, prompt orchestration, memory structures, and custom document loaders."
      },
      {
        name: "FAISS Vector Indexing",
        level: "Core",
        description: "Dense vector embeddings retrieval, exact and approximate nearest neighbor indexing (IVF, HNSW), and fast cosine similarity search."
      },
      {
        name: "Sentence-Transformers",
        level: "Core",
        description: "Generating dense semantic embeddings for passage retrieval, bi-encoder similarity matching, and cross-encoder reranking."
      },
      {
        name: "Retrieval-Augmented Generation (RAG)",
        level: "Core",
        badge: "Core",
        description: "End-to-end RAG architectures incorporating chunking strategies, contextual embeddings, and grounded response generation."
      },
      {
        name: "Multi-Agent Workflows (Llama-3.1)",
        level: "Core",
        description: "Coordinating multi-agent systems with specialized sub-roles, automated tool calling, and structured JSON output validation."
      },
      {
        name: "Knowledge Graphs & Structured Retrieval",
        level: "Proficient",
        description: "Entity-relation graphs combined with dense vector representations for hybrid semantic and factual retrieval."
      }
    ]
  },
  {
    id: "languages",
    slug: "programming-languages",
    title: "Programming Languages",
    shortTitle: "Languages",
    icon: "code",
    description: "Core compiled and interpreted programming languages for AI models, algorithmic research, and system software.",
    overview: "Strong multi-paradigm programming abilities spanning high-level scientific Python and performant systems programming in modern C++ and C.",
    skills: [
      {
        name: "Python",
        level: "Core",
        badge: "Primary",
        description: "Primary language for research, ML engineering, data science, agent orchestration, and scripting."
      },
      {
        name: "C++",
        level: "Core",
        badge: "Algorithms",
        description: "Object-oriented and systems programming, competitive programming (ACM-ICPC), data structures, and algorithmic optimization."
      },
      {
        name: "C",
        level: "Proficient",
        description: "Low-level memory management, pointer manipulation, and foundational systems engineering."
      },
      {
        name: "SQL",
        level: "Core",
        description: "Relational database querying, schema design, complex joins, indexing, and performant data retrieval."
      },
      {
        name: "Bash / Shell",
        level: "Proficient",
        description: "Automating server scripts, environment setup, and batch experiment executions in Linux environments."
      }
    ]
  },
  {
    id: "data-analysis",
    slug: "data-analysis-scientific-computing",
    title: "Data Analysis & Scientific Computing",
    shortTitle: "Data & Math",
    icon: "chart",
    description: "Numerical computation, statistical data processing, mathematical optimization, and scientific plotting.",
    overview: "Rigorous quantitative foundation in multivariable calculus, linear algebra, optimization theory, and computational statistics.",
    skills: [
      {
        name: "NumPy & SciPy",
        level: "Core",
        description: "Vectorized array operations, matrix decompositions, numerical routines, and scientific algorithms."
      },
      {
        name: "Pandas",
        level: "Core",
        description: "Tabular data cleaning, manipulation, time-series analysis, aggregation, and exploratory data analysis."
      },
      {
        name: "Matplotlib & Seaborn",
        level: "Core",
        description: "Publication-quality data visualizations, loss curves, confusion matrices, and distribution plots."
      },
      {
        name: "Linear Algebra & Probability",
        level: "Core",
        badge: "Theory",
        description: "Theoretical foundations: eigenvalue analysis, SVD, multivariate distributions, and Bayes rule."
      },
      {
        name: "Mathematical Optimization in DL",
        level: "Core",
        description: "Convex and non-convex optimization, gradient descent variants, Adam, and regularization dynamics."
      },
      {
        name: "Genetic Algorithms & Fuzzy Logic",
        level: "Core",
        description: "Heuristic search, evolutionary optimization, and fuzzy inference systems."
      }
    ]
  },
  {
    id: "front-end",
    slug: "front-end-engineering",
    title: "Front-End Engineering",
    shortTitle: "Front-End",
    icon: "layout",
    description: "Modern web interfaces, responsive layouts, utility-first CSS, and accessible frontend engineering.",
    overview: "Hands-on experience developing clean, responsive, and performance-oriented web applications and portfolio interfaces with modern web standards and styling systems.",
    skills: [
      {
        name: "HTML5",
        level: "Proficient",
        badge: "Web",
        description: "Semantic markup, accessibility (ARIA), document structure, and modern web standards."
      },
      {
        name: "CSS3",
        level: "Proficient",
        description: "Flexbox, CSS Grid, media queries, keyframe animations, transitions, and modern CSS custom properties."
      },
      {
        name: "JavaScript (ES6+)",
        level: "Proficient",
        description: "Modern asynchronous JavaScript, DOM manipulation, custom event handling, and browser APIs."
      },
      {
        name: "Tailwind CSS",
        level: "Proficient",
        badge: "Styling",
        description: "Utility-first design systems, responsive utilities, dark mode implementation, and component styling."
      },
      {
        name: "Astro & Component Architecture",
        level: "Proficient",
        description: "Content-driven web architectures, island-based interactivity, and zero-JS default performance."
      }
    ]
  },
  {
    id: "dev-tools",
    slug: "developer-tools-environments",
    title: "Developer Tools & Environments",
    shortTitle: "Dev Tools",
    icon: "terminal",
    description: "Version control, containerized workflows, Unix system environments, and scientific typesetting.",
    overview: "Familiarity with modern developer toolchains, reproducible environments, version control, and academic typesetting.",
    skills: [
      {
        name: "Git & GitHub",
        level: "Core",
        badge: "VCS",
        description: "Branching strategies, pull requests, version tracking, and collaborative software engineering."
      },
      {
        name: "Docker & Docker Compose",
        level: "Core",
        description: "Containerizing applications, creating reproducible ML environments, and multi-service definitions."
      },
      {
        name: "Linux / Unix (Ubuntu)",
        level: "Core",
        description: "Terminal navigation, process management, SSH remote server administration, and permissions."
      },
      {
        name: "LaTeX & Overleaf",
        level: "Core",
        badge: "Publishing",
        description: "Typesetting academic papers, conference submissions, mathematical equations, and formal reports."
      },
      {
        name: "VS Code & JetBrains IDEs",
        level: "Core",
        description: "Configuring development workspaces, remote containers, debugging, and linting."
      }
    ]
  }
];

export const getSkillCategoryBySlug = (slug: string) =>
  skillCategories.find((cat) => cat.slug === slug);
