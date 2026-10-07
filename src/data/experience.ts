// src/data/experience.ts

export interface WorkExperienceProject {
  title: string;
  subtitle: string;
  context: string;
  architecture: string;
  methodology: string;
  impact: string;
  bullets: string[];
  techStack: string[];
}

export interface WorkExperience {
  id: string;
  slug: string;
  role: string;
  company: string;
  location: string;
  period: string;
  headline: string;
  shortSummary: string;
  overview: string;
  projects: WorkExperienceProject[];
  keyOutcomes: string[];
  skills: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: "pars-system-energy",
    slug: "pars-system-energy",
    role: "Machine Learning Engineer",
    company: "Pars System Energy",
    location: "Tehran, Iran",
    period: "Jul 2024 – Aug 2025",
    headline: "Industrial Anomaly Detection & Autonomous Multi-Agent Systems",
    shortSummary: "Architected real-time industrial IoT predictive maintenance using deep generative modeling (ALGAN) and built a collaborative 9-agent autonomous customer support ecosystem.",
    overview: "At Pars System Energy, I worked as a Machine Learning Engineer focusing on two high-impact mission-critical initiatives: (1) an industrial predictive maintenance and telemetry anomaly detection pipeline for complex machinery such as chillers, and (2) an autonomous multi-agent customer support and monitoring ecosystem leveraging LLM orchestration, dense vector retrieval, and reflective verification guardrails.",
    projects: [
      {
        title: "Industrial Predictive Maintenance & Anomaly Detection System",
        subtitle: "Adversarially Learned Anomaly Detection on Industrial IoT Telemetry",
        context: "Heavy industrial equipment (such as chillers and cooling plants) produces high-velocity multi-channel IoT sensor telemetry. Traditional threshold-based heuristics produced frequent false alarms while failing to capture gradual operational degradation, resulting in unexpected equipment downtime and costly energy spikes.",
        architecture: "Developed a real-time sequential telemetry processing pipeline combining deep generative modeling and continuous state forecasting to model nominal machine behavior under fluctuating loads.",
        methodology: "Deployed an Adversarially Learned Anomaly Detection (ALGAN: Adjusted-LSTM GAN) framework alongside deep neural predictors to capture nominal dynamics and isolate operational anomalies. Integrated an automated Genetic Algorithm (GA) to synthesize and optimize fuzzy inference rules, dynamically assigning anomaly severity scores without manual heuristic tuning.",
        impact: "Substantially mitigated false alarm rates, lowered diagnostic latency, and prevented abnormal energy spikes caused by suboptimal operational degradation.",
        bullets: [
          "System Architecture: Developed a real-time anomaly detection pipeline for multi-channel industrial IoT telemetry (e.g., chillers), combining deep generative modeling and sequential state forecasting.",
          "Machine Learning Methodology: Deployed an Adversarially Learned Anomaly Detection (ALGAN: Adjusted-LSTM GAN) framework alongside deep neural predictors to capture nominal dynamics and isolate operational anomalies.",
          "Automated Decision Engine: Integrated an automated Genetic Algorithm (GA) to synthesize and optimize fuzzy inference rules, dynamically assigning anomaly severity scores without manual heuristic tuning.",
          "Operational Impact: Substantially mitigated false alarm rates, lowered diagnostic latency, and prevented abnormal energy spikes caused by suboptimal operational degradation."
        ],
        techStack: ["PyTorch", "ALGAN", "LSTM-GAN", "Genetic Algorithms", "Fuzzy Logic", "Sequential Modeling", "IoT Telemetry", "Docker"]
      },
      {
        title: "Autonomous Multi-Agent Customer Support & Monitoring Ecosystem",
        subtitle: "Collaborative 9-Agent Pipeline with Dense RAG & Reflection Guardrails",
        context: "Handling complex customer dialogues and multi-tier technical support inquiries required context-aware dispatching, grounding in proprietary technical manuals, and strict behavioral boundaries to eliminate hallucinations.",
        architecture: "Architected a 9-agent collaborative workflow using LangChain and Llama-3.1 to manage multi-turn dialogues, real-time intent dispatching, and automated issue resolution.",
        methodology: "Implemented dense Retrieval-Augmented Generation (RAG) using FAISS vector indexing; incorporated a reflective agent to inspect, verify, and polish responses prior to transmission. Constructed topic boundary enforcement and behavioral moderation guardrails alongside an extractor agent streaming categorized customer issue telemetry to central monitoring.",
        impact: "Automated multi-turn customer dialogues with strict factual verification, zero hallucinations, and live telemetry extraction streaming directly to central monitoring dashboards.",
        bullets: [
          "Multi-Agent Orchestration: Architected a 9-agent collaborative workflow using LangChain and Llama-3.1 to manage multi-turn dialogues, real-time intent dispatching, and automated issue resolution.",
          "Context Retrieval & Reflection: Implemented dense Retrieval-Augmented Generation (RAG) using FAISS vector indexing; incorporated a reflective agent to inspect, verify, and polish responses prior to transmission.",
          "Safety & Telemetry Guardrails: Constructed topic boundary enforcement and behavioral moderation guardrails alongside an extractor agent streaming categorized customer issue telemetry to central monitoring."
        ],
        techStack: ["LangChain", "Llama-3.1", "FAISS", "Dense RAG", "Multi-Agent Systems", "Python", "Telemetry Streaming"]
      }
    ],
    keyOutcomes: [
      "Mitigated false alarm rates and significantly lowered diagnostic latency across multi-channel IoT sensor streams.",
      "Replaced manual heuristic threshold tuning with automated Genetic Algorithm fuzzy inference optimization.",
      "Orchestrated 9 collaborative agents with reflective verification and safety guardrails for reliable customer resolution."
    ],
    skills: ["PyTorch", "ALGAN (LSTM-GAN)", "Genetic Algorithms", "Fuzzy Inference", "LangChain", "Llama-3.1", "FAISS", "RAG Pipelines", "Multi-Agent Systems", "IoT Telemetry", "Docker"]
  }
];

export const getWorkExperienceBySlug = (slug: string) =>
  workExperiences.find((exp) => exp.slug === slug);
