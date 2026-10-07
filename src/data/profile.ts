export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  subrole: string;
  affiliation: string;
  location: string;
  bio: string[];
  researchStatement: string;
  researchInterests: string[];
  email: string;
  cvUrl: string;
  avatarUrl: string;
  status: {
    available: boolean;
    text: string;
  };
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Arman Heidari",
  initials: "AH",
  role: "M.Sc. Student in Artificial Intelligence",
  subrole: "Sharif University of Technology",
  affiliation: "M.Sc. Student in AI @ SUT",
  location: "Tehran, Iran",
  bio: [
    "I am a Master's student in Artificial Intelligence at Sharif University of Technology. My background is rooted in Computer Engineering, where I spent years developing an enduring respect for algorithms, discrete mathematics, and systems programming.",
    "I am fascinated by machine learning and deep neural architectures—the ability to learn representations directly from data rather than handcrafted rules. To me, Reinforcement Learning is the 'final boss' of AI: the compelling challenge of autonomous decision-making in complex, dynamic environments that I aspire to explore throughout my academic journey."
  ],
  researchStatement: "Driven by a deep curiosity for machine learning, neural architectures, and intelligent systems—with reinforcement learning standing as the ultimate frontier to explore.",
  researchInterests: [
    "Machine Learning & Deep Architectures",
    "Autonomous Systems & Reinforcement Learning",
    "Mathematical Foundations & Optimization",
    "Algorithmic Systems & First-Principles Engineering"
  ],
  email: "armanheidari192@gmail.com",
  cvUrl: "/Arman_Heidari_Academic_CV.pdf",
  avatarUrl: "/images/arman-heidari.webp",
  status: {
    available: true,
    text: "Open to academic collaborations & discussions"
  },
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/armanheidari",
      icon: "github",
      label: "github.com/armanheidari"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arman-heidari/",
      icon: "linkedin",
      label: "linkedin.com/in/arman-heidari"
    },
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=fgeLGrAAAAAJ&hl=en",
      icon: "graduation-cap",
      label: "Google Scholar Profile"
    },
    {
      name: "ORCID",
      url: "https://orcid.org/0009-0005-7230-1878",
      icon: "orcid",
      label: "ORCID Profile"
    },
    {
      name: "Email",
      url: "mailto:armanheidari192@gmail.com",
      icon: "mail",
      label: "armanheidari192@gmail.com"
    }
  ]
};
