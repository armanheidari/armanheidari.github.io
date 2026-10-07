export interface PublicationLink {
  label: string;
  url: string;
  type: 'pdf' | 'arxiv' | 'code' | 'slides' | 'demo' | 'external';
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status: 'Published' | 'Preprint' | 'Under Review' | 'Master’s Thesis' | 'In Progress';
  abstract: string;
  bibtex: string;
  links: PublicationLink[];
  tags: string[];
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: "isle-arxiv-2025",
    title: "Intelligent Scientific Literature Explorer using Machine Learning (ISLE)",
    authors: ["S. Jani", "Arman Heidari", "A. Anvari", "Z. Rahimi"],
    venue: "arXiv preprint arXiv:2512.12760 [cs.IR, cs.AI, cs.CL]",
    year: 2025,
    status: "Preprint",
    abstract: "Architected a scientific discovery engine integrating hybrid retrieval (BM25 + dense sentence embeddings via Reciprocal Rank Fusion) and automated semantic clustering (BERTopic/NMF). Engineered a heterogeneous knowledge graph mapping multi-hop entity relationships and thematic evolution across arXiv and OpenAlex datasets. Supervised by Dr. Zahra Rahimi.",
    bibtex: `@article{jani2025isle,
  title={Intelligent Scientific Literature Explorer using Machine Learning (ISLE)},
  author={Jani, S. and Heidari, Arman and Anvari, A. and Rahimi, Z.},
  journal={arXiv preprint arXiv:2512.12760},
  year={2025},
  eprint={2512.12760},
  archivePrefix={arXiv},
  primaryClass={cs.IR}
}`,
    links: [
      { label: "arXiv:2512.12760", url: "https://arxiv.org/abs/2512.12760", type: "arxiv" },
      { label: "Code Repository", url: "https://github.com/armanheidari/ISLE", type: "code" }
    ],
    tags: ["Information Retrieval", "Semantic Search", "Reciprocal Rank Fusion", "Knowledge Graphs", "BERTopic", "OpenAlex"],
    featured: true
  }
];
