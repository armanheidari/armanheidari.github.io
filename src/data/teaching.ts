// src/data/teaching.ts

export type TeachingCategory = 'teaching' | 'mentorship' | 'leadership';

export interface TeachingItem {
  id: string;
  slug: string;
  category: TeachingCategory;
  title: string;
  role: string;
  institution: string;
  department?: string;
  instructor?: string;
  period: string;
  badge: string;
  overview: string;
  responsibilities: string[];
  externalUrl?: string;
  externalLabel?: string;
}

export const teachingItems: TeachingItem[] = [
  // ==================== 1. TEACHING ASSISTANTSHIPS ====================
  {
    id: "fundamentals-of-programming-c-fall-2024",
    slug: "fundamentals-of-programming-c-fall-2024",
    category: "teaching",
    title: "Fundamentals of Programming (C/C++)",
    role: "Teaching Assistant",
    instructor: "Dr. Zahra Rashidi",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2024",
    badge: "TA",
    overview: "Served as Teaching Assistant for the foundational Computer Engineering programming course, supervising weekly discussion sections and mentoring undergraduate students through algorithmic problem solving.",
    responsibilities: [
      "Conducted weekly recitation and problem-solving sessions for cohorts of 35+ undergraduate students.",
      "Designed algorithmic and coding assignments with automated test suites for C and C++.",
      "Held weekly one-on-one debugging office hours focusing on GDB and Linux terminal development.",
      "Managed assignment grading"
    ]
  },
  {
    id: "programming-languages-fall-2024",
    slug: "programming-languages-fall-2024",
    category: "teaching",
    title: "Programming Languages",
    role: "Teaching Assistant",
    instructor: "Dr. Hassan Rashidi",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2024",
    badge: "TA",
    overview: "Held office hours for the Programming Languages course, mentoring undergraduate students on formal grammars, syntax analysis, typing disciplines, and comparative language semantics.",
    responsibilities: [
      "Held office hours assisting students with interpreter constructs and grammar analyzers.",
    ]
  },
  {
    id: "introduction-to-databases-fall-2024",
    slug: "introduction-to-databases-fall-2024",
    category: "teaching",
    title: "Introduction to Databases",
    role: "Head Teaching Assistant",
    instructor: "Dr. Karimi",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2024",
    badge: "Head TA",
    overview: "Supervised semester database projects and led recitations covering relational algebra, complex SQL queries, and transaction processing.",
    responsibilities: [
      "Led weekly recitations covering relational algebra, advanced SQL querying (subqueries, joins, grouping).",
      "Supervised teams developing end-to-end database application semester projects and reviewed schema designs.",
      "Held office hours advising students on relational schema optimization and SQL query debugging."
    ]
  },
  {
    id: "data-structures-and-algorithms-fall-2023",
    slug: "data-structures-and-algorithms-fall-2023",
    category: "teaching",
    title: "Data Structures and Algorithms",
    role: "Head Teaching Assistant",
    instructor: "Dr. Zahra Rahimi",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2023",
    badge: "Head TA",
    overview: "Holding recitations on asymptotic analysis, balanced search trees, graph algorithms, and dynamic programming.",
    responsibilities: [
      "Conducted weekly problem-solving recitations on asymptotic runtime analysis (Big-O) and recurrence relations.",
      "Guided students through balanced search trees (AVL, Red-Black), heaps, and hash table implementations.",
      "Walked through optimal graph algorithms (BFS, DFS, Dijkstra, Prim, Kruskal) with formal correctness proofs.",
      "Held exam review problem-solving sessions and assisted with grading."
    ]
  },
  {
    id: "fundamentals-of-programming-python-fall-2023",
    slug: "fundamentals-of-programming-python-fall-2023",
    category: "teaching",
    title: "Fundamentals of Programming (Python)",
    role: "Head Teaching Assistant",
    instructor: "Dr. Mobasheri",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2023",
    badge: "Head TA",
    overview: "Mentored freshman undergraduate students in establishing idiomatic Python programming, clean code architecture, object-oriented principles, and introductory scientific computing.",
    responsibilities: [
      "Led recitation sessions on object-oriented programming (classes, inheritance, encapsulation) and clean coding standards.",
      "Mentored first-year students during weekly lab sessions, troubleshooting syntax and logic errors.",
      "Held office hours advising students on Python programming and clean code architecture.",
      "Assisted with reviewing and grading semester programming assignments."
    ]
  },
  {
    id: "signals-and-systems-fall-2023",
    slug: "signals-and-systems-fall-2023",
    category: "teaching",
    title: "Signals and Systems",
    role: "Head Teaching Assistant",
    instructor: "Dr. Ghaemi",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2023",
    badge: "Head TA",
    overview: "Bridging analytical mathematics with digital signal processing intuition for computer engineering students.",
    responsibilities: [
      "Conducted recitation sessions solving mathematical derivations for continuous and discrete-time LTI systems.",
      "Guided students through convolution, impulse responses, and system stability criteria.",
      "Deconstructed Fourier Series, Fourier Transforms (CTFT/DTFT), and Laplace Transforms with Region of Convergence (ROC).",
      "Held office hours providing step-by-step mathematical feedback on homework submissions."
    ]
  },
  {
    id: "engineering-mathematics-fall-2022",
    slug: "engineering-mathematics-fall-2022",
    category: "teaching",
    title: "Engineering Mathematics",
    role: "Head Teaching Assistant",
    instructor: "Dr. Shokouh Shahbeyk",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Fall 2022",
    badge: "Head TA",
    overview: "Conducted weekly problem-solving recitations and tutored students on fundamental topics in differential calculus, integral calculus, complex numbers, and partial differential equations.",
    responsibilities: [
      "Led weekly problem-solving sessions covering multivariable calculus concepts.",
      "Mentored undergraduate students on applying mathematical reasoning to problems.",
      "Held dedicated review workshops to solidify student understanding of core mathematical theories and applications."
    ]
  },

  // ==================== 2. MENTORSHIP & CONSULTING ====================
  {
    id: "cshub-konkur-consultant-fall-2026",
    slug: "cshub-konkur-consultant-fall-2026",
    category: "mentorship",
    title: "Master's Entrance Exam Consultant",
    role: "Academic Consultant & Strategy Advisor",
    department: "Computer Engineering Academy",
    institution: "csHub",
    period: "Sep 2026 – Present",
    badge: "Professional Advisory",
    overview: "Selected by csHub as an official academic consultant following Rank 1 achievement nationwide in the 2026 Konkur. Deliver tailored weekly consultations, personalized study roadmaps across theoretical CS, and exam strategy audits.",
    responsibilities: [
      "Conduct one-on-one diagnostic sessions to analyze student academic baselines and target specializations (AI, Software, Systems).",
      "Formulate custom study schedules with balanced milestone checkpoints across theoretical CS, mathematics, and systems.",
      "Perform progress audits, reviewing practice problem accuracy, time-per-question metrics, and topic retention.",
      "Deliver tailored guidance on exam psychology, negative scoring reduction, and mock exam debriefs."
    ],
    externalUrl: "https://cshub.ir/product/%d9%85%d8%b4%d8%a7%d9%88%d8%b1%d9%87-%d8%aa%da%a9%d8%ac%d9%84%d8%b3%d9%87%d8%a7%db%8c-%d9%88-%d9%87%d9%81%d8%aa%da%af%db%8c-%d8%a8%d8%a7-%d8%a2%d8%b1%d9%85%d8%a7%d9%86-%d8%ad%db%8c%d8%af/",
    externalLabel: "View Verified csHub Profile"
  },
  {
    id: "cshub-volunteer-mentor-fall-2026",
    slug: "cshub-volunteer-mentor-fall-2026",
    category: "mentorship",
    title: "Community Student Mentor",
    role: "Pro Bono Academic Mentor",
    department: "Student Community",
    institution: "csHub & Student Body",
    period: "Sep 2026 – Present",
    badge: "Volunteer Service",
    overview: "Provide pro bono volunteer mentorship to undergraduate applicants preparing for the Master's Entrance Exam, answering questions, guiding study planning, and curating study resources.",
    responsibilities: [
      "Host open community Q&A sessions answering questions on study methodologies and syllabus prioritization.",
      "Curate and share free, high-yield study resources, problem sets, and reference summaries for applicants.",
      "Provide direct peer mentorship for students navigating academic choices and graduate program specializations."
    ]
  },

  // ==================== 3. ACADEMIC LEADERSHIP & SERVICE (1 Initiative) ====================
  {
    id: "atu-computer-association-vp-2024-2025",
    slug: "atu-computer-association-vp-2024-2025",
    category: "leadership",
    title: "Vice President, Computer Science Student Association",
    role: "Vice President",
    department: "Department of Computer Engineering",
    institution: "Allameh Tabataba'i University",
    period: "Sep 2024 – Sep 2025",
    badge: "Executive Leadership",
    overview: "Served as Vice President of the Student Computer Science Association for a one-year tenure, co-managing technical workshops, academic seminars, and student representation.",
    responsibilities: [
      "Co-managed the operational and academic agenda of the departmental student association for the 2024–2025 academic year.",
      "Spearheaded technical workshops on Git version control, Linux environments, and Python programming for undergraduate cohorts.",
      "Organized academic seminars and speaker panels featuring industry professionals, graduate researchers, and alumni.",
      "Served as a direct liaison between undergraduate students and department faculty to communicate curriculum feedback and academic needs."
    ]
  }
];

export const getTeachingItemsByCategory = (category: TeachingCategory) =>
  teachingItems.filter((item) => item.category === category);

export const getTeachingItemBySlug = (slug: string) =>
  teachingItems.find((item) => item.slug === slug);
