// src/data/education.ts

export interface Course {
  name: string;
  credits: number;
  score: number; // score out of 20
}

export interface EducationItem {
  id: string;
  slug: string;
  degree: string;
  field: string;
  institution: string;
  department: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Graduated';
  badge: string;
  logoUrl?: string;
  logoPlaceholder: {
    name: string;
    shortName: string;
    bgGradient: string;
    textColor: string;
    borderColor: string;
  };
  explanation: string;
  // GPA specifications: can be explicitly set or computed from courses
  overallGpa20?: number;
  overallGpa4?: number;
  majorGpa20?: number;
  majorGpa4?: number;
  majorCourses: Course[];
  generalCourses?: Course[];
  honors?: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badge?: string;
  highlight?: string;
}

// Helper to sort courses: descending by score, then descending by credits as tie-breaker
export function sortCourses(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Score descending
    }
    return b.credits - a.credits; // Credits descending (tie-breaker)
  });
}

// Helper to compute weighted GPA out of 20 and out of 4.0
export function computeWeightedGPA(courses: Course[]) {
  if (!courses || courses.length === 0) {
    return { gpa20: 0, gpa4: 0, totalCredits: 0 };
  }
  let totalCredits = 0;
  let totalScoreWeight = 0;

  for (const c of courses) {
    totalCredits += c.credits;
    totalScoreWeight += c.score * c.credits;
  }

  const gpa20 = totalCredits > 0 ? totalScoreWeight / totalCredits : 0;
  // Standard conversion to 4.0 scale:
  // Grades >= 17 in Iranian system represent A/4.0; linear scale fallback:
  let total4Weight = 0;
  for (const c of courses) {
    const val4 = c.score >= 17 ? 4.0 : c.score >= 14 ? 3.0 + ((c.score - 14) / 3) : (c.score / 20) * 4.0;
    total4Weight += val4 * c.credits;
  }
  const gpa4 = totalCredits > 0 ? total4Weight / totalCredits : 0;

  return {
    gpa20: Number(gpa20.toFixed(2)),
    gpa4: Number(gpa4.toFixed(2)),
    totalCredits
  };
}

export const educationList: EducationItem[] = [
  {
    id: "msc-sharif",
    slug: "msc-artificial-intelligence-sharif",
    degree: "Master of Science (M.Sc.)",
    field: "Artificial Intelligence",
    institution: "Sharif University of Technology",
    department: "Department of Computer Engineering",
    location: "Tehran, Iran",
    period: "Sep 2026 – Expected 2028",
    startDate: "Sep 2026",
    endDate: "Expected 2028",
    status: "In Progress",
    badge: "Graduate Studies",
    logoUrl: "/images/sharif.svg",
    logoPlaceholder: {
      name: "Sharif University of Technology",
      shortName: "SUT",
      bgGradient: "from-blue-600/20 via-indigo-600/20 to-sky-600/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-500/30"
    },
    explanation: "Pursuing Master's research in Artificial Intelligence at Sharif University of Technology, focusing on Deep Reinforcement Learning, Representation Learning, and Out-of-Distribution Anomaly Detection. Coursework emphasizes advanced theoretical machine learning, mathematical optimization, and autonomous decision systems.",
    overallGpa4: undefined,
    overallGpa20: undefined,
    majorGpa4: undefined,
    majorGpa20: undefined,
    majorCourses: [
    ],
    honors: [
      "Rank 1 Nationwide in M.Sc. University Entrance Exam (Konkur) in Computer Engineering (2026)"
    ]
  },
  {
    id: "bsc-atu",
    slug: "bsc-computer-engineering-atu",
    degree: "Bachelor of Science (B.Sc.)",
    field: "Computer Engineering",
    institution: "Allameh Tabataba'i University",
    department: "Department of Computer Engineering",
    location: "Tehran, Iran",
    period: "Sep 2021 – Jul 2025",
    startDate: "Sep 2021",
    endDate: "Jul 2025",
    status: "Graduated",
    badge: "Class Valedictorian",
    logoUrl: "/images/atu.svg",
    logoPlaceholder: {
      name: "Allameh Tabataba'i University",
      shortName: "ATU",
      bgGradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
    explanation: "Graduated as Class Valedictorian (Rank 1 Academic Standing) across all undergraduate Computer Engineering cohorts at Allameh Tabataba'i University with a cumulative GPA of 19.29 / 20.00 (3.96 / 4.00) and Major GPA of 19.35 / 20.00 (3.96 / 4.00). Completed comprehensive curricula spanning data structures, algorithms, computer architecture, machine learning, and advanced mathematics.",
    overallGpa4: 3.96,
    overallGpa20: 19.29,
    majorGpa4: 3.96,
    majorGpa20: 19.35,
    majorCourses: [
      { name: "Linear Algebra", credits: 3, score: 20.0 },
      { name: "Artificial Neural Networks", credits: 3, score: 20.0 },
      { name: "Natural Language Processing", credits: 3, score: 20.0 },
      { name: "Artificial Intelligence", credits: 3, score: 20.0 },
      { name: "Fundamentals of Computational Intelligence", credits: 3, score: 20.0 },
      { name: "Data Structures & Algorithms", credits: 3, score: 20.0 },
      { name: "Advanced Programming", credits: 3, score: 20.0 },
      { name: "Advanced Programming Workshop", credits: 1, score: 20.0 },
      { name: "Database Design", credits: 3, score: 20.0 },
      { name: "Operating Systems", credits: 3, score: 20.0 },
      { name: "Operating Systems Lab", credits: 1, score: 20.0 },
      { name: "Signals & Systems", credits: 3, score: 20.0 },
      { name: "Design of Algorithms", credits: 3, score: 17.5 },
      { name: "Fundamentals of Computer and Programming", credits: 3, score: 20.0 },
      { name: "Fundamentals of Computer and Programming Workshop", credits: 1, score: 20.0 },
      { name: "Discrete Mathematics", credits: 3, score: 19.3 },
      { name: "Logic Circuits", credits: 3, score: 20.0 },
      { name: "Logic Circuits Lab", credits: 1, score: 20.0 },
      { name: "Technical English for Computing", credits: 2, score: 20.0 },
      { name: "Electrical and Electorinic Circuits", credits: 3, score: 17.8 },
      { name: "Electrical and Electorinic Circuits Lab", credits: 1, score: 18.0 },
      { name: "Computer Architecture", credits: 3, score: 19.0 },
      { name: "Computer Architecture Lab", credits: 1, score: 20.0 },
      { name: "Theory of Machines and Languages", credits: 3, score: 14.5 },
      { name: "Microprocessors and Assembly Language", credits: 3, score: 20.0 },
      { name: "Microprocessors and Assembly Language Lab", credits: 1, score: 20.0 },
      { name: "Research and Presentation Methods", credits: 2, score: 20.0 },
      { name: "Software Engineering I", credits: 3, score: 16.0 },
      { name: "Software Engineering II", credits: 3, score: 20.0 },
      { name: "Computer Networks", credits: 3, score: 20.0 },
      { name: "Computer Networks Lab", credits: 1, score: 18.5 },
      { name: "Design of Programming Languages", credits: 3, score: 19.0 },
      { name: "Information Retrieval", credits: 3, score: 20.0 },
      { name: "Data Mining", credits: 3, score: 20.0 },
      { name: "Web Programming", credits: 3, score: 20.0 },
      { name: "Cloud Computing", credits: 3, score: 20.0 },
      { name: "Theory of Computation", credits: 3, score: 19.0 },
      { name: "Internship", credits: 1, score: 20.0 },
      { name: "BSc Project", credits: 3, score: 20.0 },
      { name: "Fundamentals of Robotics", credits: 3, score: 16.58 },
    ],
    generalCourses: [
      { name: "Calculus I", credits: 3, score: 20 },  
      { name: "Calculus II", credits: 3, score: 20.0 },
      { name: "Physics I", credits: 3, score: 16.9 },
      { name: "Physics II", credits: 3, score: 20.0 },
      { name: "Physics II Lab", credits: 1, score: 20.0 },
      { name: "Differential Equations", credits: 3, score: 20.0 },
      { name: "Engineering Probability and Statistics", credits: 3, score: 19.0 },
      { name: "Electronic Measurements Lab", credits: 1, score: 19.0 },
      { name: "English Language", credits: 3, score: 20.0 },
      { name: "Persian Language", credits: 3, score: 15.5 },
      { name: "Islamic Thoughts I", credits: 2, score: 20.0 },
      { name: "Islamic Thoughts II", credits: 2, score: 20.0 },
      { name: "The Ethics of Life", credits: 2, score: 19.0 },
      { name: "Family and Population Studies", credits: 2, score: 20.0 },
      { name: "Analytical History of Early Islam", credits: 2, score: 19.0 },
      { name: "History of the Islamic Revolution of Iran", credits: 2, score: 20.0 },
      { name: "Thematic Interpretation of the Qur'an", credits: 2, score: 19.5 },
      { name: "Physical Education", credits: 1, score: 19.0 },
      { name: "Sports", credits: 1, score: 20.0 }
    ],
    honors: [
      "Ranked 1st Academic Standing among all Class of 2025 Computer Engineering Graduates",
      "Cumulative GPA: 19.29 / 20.00 (3.96 / 4.00) across 142 completed credits",
      "Major GPA: 19.35 / 20.00 (3.96 / 4.00) across 103 major credits"
    ]
  }
];

export const awardsList: AwardItem[] = [
  {
    id: "konkur-rank-1",
    title: "Ranked 1st — Nationwide M.Sc. Entrance Exam (Konkur)",
    issuer: "National Organization for Educational Testing (Sanjesh)",
    year: "2026",
    description: "Achieved Rank 1 nationwide among 20,000+ candidates in the Computer Engineering group in the Iranian National Master's University Entrance Examination.",
    badge: "National Rank 1 / 20,000+",
    highlight: "Scored highest nationally in Artificial Intelligence, Software Engineering, and Algorithms."
  },
  {
    id: "valedictorian-atu",
    title: "Ranked 1st Academic Standing (Class Valedictorian)",
    issuer: "Allameh Tabataba'i University",
    year: "2025",
    description: "Graduated with highest cumulative GPA (19.29 / 20.00) among all undergraduate Computer Engineering graduates in the Class of 2025.",
    badge: "GPA 19.29 / 20.00",
    highlight: "Conferred Valedictorian recognition across the Faculty of Computer Engineering."
  },
  {
    id: "acm-icpc",
    title: "7th Place — ACM-ICPC Regional Collegiate Programming Contest",
    issuer: "ICPC Asia Tehran Regional Contest",
    year: "2022",
    description: "Demonstrated advanced algorithmic design, dynamic programming, graph theory, and rapid competitive problem-solving under strict contest constraints.",
    badge: "7th Place Regional",
    highlight: "Competed against top university engineering teams across Iran and Asia West."
  }
];

export const getEducationBySlug = (slug: string) =>
  educationList.find((edu) => edu.slug === slug);
