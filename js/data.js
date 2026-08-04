/**
 * The Growing Cosmic Mind - Portfolio Data Architecture
 * Arman Heidari - Computer Engineering Graduate (Allameh Tabataba'i University)
 * AI, Machine Learning, Deep Learning & Reinforcement Learning Focus
 */

export const cosmicData = {
  profile: {
    name: "Arman Heidari",
    role: "B.Sc. Graduate in Computer Engineering",
    specialties: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Reinforcement Learning"],
    university: "Allameh Tabataba'i University",
    startYear: 2020,
    github: "https://github.com/armanheidari",
    linkedin: "https://www.linkedin.com/in/arman-heidari/",
    email: "mailto:armanheidarii.dev@gmail.com"
  },

  // Refined Executive Palette Tokens
  palette: {
    originWhite: "#F0F8FF",
    iceCyan: "#64D2FF",
    roseAmber: "#FF7E95",
    creativeViolet: "#AF52DE",
    neuralTeal: "#30D158",
    quantumCyan: "#5E5CE6",
    cobaltBlue: "#0A84FF",
    emeraldGreen: "#34C759",
    kafkaPurple: "#BF5AF2",
    deepVoid: "#04030D"
  },

  // Narrative Timeline & Camera Trajectories per Scroll Stage (0.0 to 1.0)
  stages: [
    {
      id: 1,
      name: "Birth",
      scrollRange: [0.0, 0.20],
      cameraPos: { x: 0, y: 0, z: 28 },
      cameraTarget: { x: 0, y: 0, z: 0 },
      title: "The Birth of a Mind",
      subtitle: "A single core node ignites in the cosmic void..."
    },
    {
      id: 2,
      name: "Early Growth",
      scrollRange: [0.20, 0.40],
      cameraPos: { x: -14, y: 5, z: 26 },
      cameraTarget: { x: -8, y: 1, z: 0 },
      title: "Foundations & Exploration",
      subtitle: "Academic computer science foundations meet practical web tools."
    },
    {
      id: 3,
      name: "Expansion",
      scrollRange: [0.40, 0.60],
      cameraPos: { x: 14, y: -5, z: 30 },
      cameraTarget: { x: 8, y: -2, z: 0 },
      title: "AI, Deep Learning & Systems",
      subtitle: "Core machine learning ignites alongside data pipeline exploration."
    },
    {
      id: 4,
      name: "Projects",
      scrollRange: [0.60, 0.82],
      cameraPos: { x: 0, y: 16, z: 38 },
      cameraTarget: { x: 0, y: 2, z: -5 },
      title: "Satellite Formations",
      subtitle: "Orbiting project satellites circling the neural mind."
    },
    {
      id: 5,
      name: "Present & Beyond",
      scrollRange: [0.82, 1.0],
      cameraPos: { x: 22, y: 10, z: 42 },
      cameraTarget: { x: 12, y: 4, z: -10 },
      title: "Reinforcement Learning & Future",
      subtitle: "Stepping into Master's research frontiers and advanced AI."
    }
  ],

  // Spacious Nodes configuration
  nodes: [
    // --- STAGE 1: CORE / BIRTH ---
    {
      id: "node-core",
      stage: 1,
      label: "Core Mind",
      category: "Origin",
      position: [0, 0, 0],
      color: "#64D2FF", // Pure Icy Celestial Cyan
      size: 1.5,
      hollow: false,
      pulseSpeed: 1.5,
      content: {
        title: "Arman Heidari",
        subtitle: "Stay Hungry, Stay Foolish",
        type: "hero",
        body: "A living neural network representing an artificial mind and a journey through Computer Engineering, AI, Machine Learning, Deep Learning, and data systems exploration.",
        tags: ["Computer Engineering", "AI / ML", "Python / C++"],
        actions: [
          { text: "Explore Journey", targetStage: 2, isPrimary: true },
          { text: "GitHub", link: "https://github.com/armanheidari" }
        ]
      }
    },

    // --- STAGE 2: EARLY GROWTH (ABOUT & FRONTEND) ---
    {
      id: "node-about",
      stage: 2,
      label: "About Me",
      category: "Background",
      position: [-11, 5, -4],
      color: "#FF7E95", // Warm Coral Rose
      size: 1.2,
      hollow: true,
      connections: ["node-core"],
      content: {
        title: "About Me",
        subtitle: "I have no special talent, I am only passionately curious.",
        type: "about",
        body: "Hello! I’m Arman Heidari, a Computer Engineering graduate from Allameh Tabataba’i University with a strong passion for Artificial Intelligence, Machine Learning, and Deep Learning. Having completed my Bachelor's degree, I balance rigorous academic CS foundations with hands-on ML implementation.",
        highlights: [
          "B.Sc. Graduate in Computer Engineering from Allameh Tabataba'i University",
          "Solid foundations in C++, Python, algorithms, and software engineering",
          "Preparing for Master's studies with a focus on Reinforcement Learning"
        ],
      }
    },
    {
      id: "node-frontend",
      stage: 2,
      label: "Front-End Era",
      category: "Foundation",
      position: [-9, -6, 3],
      color: "#AF52DE", // Deep Creative Violet
      size: 1.1,
      hollow: false,
      connections: ["node-core", "node-about"],
      content: {
        title: "Front-End Development Exploration",
        subtitle: "Practical Web Fundamentals (2020 - 2022)",
        type: "skill",
        body: "My early coding journey involved exploring front-end web development to understand fundamental user interfaces, web design, and interactive applications.",
        highlights: [
          "Hands-on experience with HTML5, CSS3, Tailwind CSS, and Vanilla JavaScript",
          "Built clean web interfaces to present projects and data",
          "Gained practical front-end skills to construct modern web presentation layers"
        ],
        tags: ["HTML5", "CSS3", "Tailwind CSS", "Vanilla JS", "Web UI"]
      }
    },

    // --- STAGE 3: EXPANSION (MACHINE LEARNING & DATA ENGINEERING EXPLORATION) ---
    {
      id: "node-ml",
      stage: 3,
      label: "Machine Learning",
      category: "Core Domain",
      position: [12, 4, -6],
      color: "#30D158", // Deep Emerald AI Teal
      size: 1.3,
      hollow: false,
      connections: ["node-core", "node-frontend"],
      content: {
        title: "Machine Learning & Deep Learning",
        subtitle: "Architecting Intelligent Systems (2022 - Present)",
        type: "domain",
        body: "In 2022, I pivoted heavily into Machine Learning and subsequently added Deep Learning to my knowledge base. Driven by a passion for artificial intelligence, I study core ML architectures, neural networks, and self-directed academic materials.",
        highlights: [
          "Deep Learning, Neural Networks & Natural Language Processing",
          "Supervised / Unsupervised Learning & Feature Engineering",
          "Model training, evaluation, and PyTorch / Scikit-Learn implementations"
        ],
        tags: ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Deep Learning"]
      }
    },
    {
      id: "node-dataeng",
      stage: 3,
      label: "Data Systems",
      category: "Exploration",
      position: [10, -7, -2],
      color: "#0A84FF", // High-Throughput Cobalt Blue
      size: 1.3,
      hollow: true,
      connections: ["node-ml", "node-core"],
      content: {
        title: "Data Engineering Exploration",
        subtitle: "Supporting Infrastructure for ML Pipelines",
        type: "domain",
        body: "Recognizing that robust data processing is essential for building effective Machine Learning systems, I explored Data Engineering tools to enhance my ML capabilities and data pipeline handling.",
        highlights: [
          "Explored ETL/ELT pipelines and streaming data architecture to support ML models",
          "Practiced event streaming with Apache Kafka & Docker containerization",
          "PostgreSQL, NocoDB, and Python data processing tools"
        ],
        tags: ["Apache Kafka", "Docker", "PostgreSQL", "ETL Pipelines"]
      }
    },

    // --- STAGE 4: PROJECT SATELLITES ---
    {
      id: "node-proj-toxic",
      stage: 4,
      isSatellite: true,
      label: "Toxic Comment Classifier",
      category: "NLP Satellite",
      color: "#FF453A", // Vibrant Crimson Coral
      size: 1.1,
      orbitCenterNode: "node-ml",
      orbitRadius: 14,
      orbitSpeed: 0.00035,
      orbitAngle: 0.5,
      orbitTilt: 0.25,
      connections: ["node-ml"],
      content: {
        title: "Toxic Comment Classifier",
        subtitle: "Deep Learning & Natural Language Processing",
        type: "project",
        body: "A deep learning model built to identify and classify six categories of online toxicity in social media comments, trained on Kaggle competition datasets.",
        highlights: [
          "Text cleaning, custom tokenization, and sequence padding",
          "Multi-label classification across 6 distinct toxicity types",
          "Evaluated with high accuracy and ROC-AUC metrics"
        ],
        tags: ["Python", "NLP", "Deep Learning", "Kaggle", "Tokenization"],
        github: "https://github.com/armanheidari/Deep-Learning-Toxic-Comment-Classifier"
      }
    },
    {
      id: "node-proj-tsetmc",
      stage: 4,
      isSatellite: true,
      label: "TSETMC ETL Analysis",
      category: "ETL Satellite",
      color: "#FFD60A", // Golden Amber Analytics
      size: 1.1,
      orbitCenterNode: "node-dataeng",
      orbitRadius: 16,
      orbitSpeed: -0.0003,
      orbitAngle: 2.4,
      orbitTilt: -0.3,
      connections: ["node-dataeng"],
      content: {
        title: "TSETMC Stock ETL Analysis",
        subtitle: "Financial Data Ingestion & Analytics Pipeline",
        type: "project",
        body: "A Python solution that automatically fetches, transforms, and analyzes stock market data from TSETMC, featuring modular data retrieval, CSV processing, automated logging, and HTML reporting.",
        highlights: [
          "Automated financial data extraction & format conversion",
          "Customizable analytical metrics with structured logging",
          "Generates dynamic visual HTML analytical reports"
        ],
        tags: ["Python", "ETL", "Data Analysis", "Logging", "HTML Reports"],
        github: "https://github.com/armanheidari/TSETMC-ETL-Analysis"
      }
    },
    {
      id: "node-proj-randomuser",
      stage: 4,
      isSatellite: true,
      label: "Randomuser Data Pipeline",
      category: "Streaming Satellite",
      color: "#BF5AF2", // Electric Amethyst Kafka
      size: 1.2,
      orbitCenterNode: "node-core",
      orbitRadius: 22,
      orbitSpeed: 0.00025,
      orbitAngle: 4.6,
      orbitTilt: 0.35,
      connections: ["node-dataeng"],
      content: {
        title: "Randomuser Streaming Pipeline",
        subtitle: "Kafka, Docker, PostgreSQL & NocoDB System",
        type: "project",
        body: "A scalable containerized data pipeline built with Python, Apache Kafka, NocoDB, and PostgreSQL to stream, transform, and store real-time user data from API sources.",
        highlights: [
          "Event-driven architecture with Apache Kafka messaging",
          "Dockerized multi-container setup for seamless deployment",
          "Relational database storage integrated with NocoDB UI"
        ],
        tags: ["Kafka", "Docker", "PostgreSQL", "Python", "NocoDB"],
        github: "https://github.com/armanheidari/Randomuser-Data-Pipeline"
      }
    },

    // --- STAGE 5: PRESENT & BEYOND / REINFORCEMENT LEARNING FUTURE ---
    {
      id: "node-contact",
      stage: 5,
      label: "RL & Future Focus",
      category: "Future Frontier",
      position: [20, 8, -16],
      color: "#5E5CE6", // Deep Indigo Prism
      size: 1.4,
      hollow: true,
      pulseSpeed: 2.0,
      connections: ["node-proj-randomuser", "node-ml"],
      content: {
        title: "Reinforcement Learning & Future Frontiers",
        subtitle: "Preparing for Master's Studies & Advanced AI",
        type: "contact",
        body: "Having added Deep Learning to my core knowledge base, I am deeply curious about Reinforcement Learning (RL) and plan to focus on RL and advanced autonomous AI research during my Master's degree studies. Interested in collaborating or connecting?",
        actions: [
          { text: "LinkedIn", link: "https://www.linkedin.com/in/arman-heidari/", isPrimary: true },
          { text: "GitHub", link: "https://github.com/armanheidari" },
          { text: "Email Me", link: "mailto:armanheidarii.dev@gmail.com" }
        ],
        tags: ["Reinforcement Learning", "Master's Degree Focus", "AI Collaborations", "Deep Learning"]
      }
    }
  ]
};
