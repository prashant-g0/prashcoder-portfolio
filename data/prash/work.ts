export interface WorkExperience {
  id: number;
  slug: string;
  orgName: string;
  role: string;
  isCurrent: boolean;
  workType: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  technologiesUsed: string[];
  contributions: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: 5,
    slug: "software-development-intern",
    orgName: "Piana IT Solutions",
    role: "Software Development Intern",
    isCurrent: true,
    workType: "Internship",
    startYear: "2026",
    startMonth: "September",
    endMonth: "",
    endYear: "",
    technologiesUsed: [
      "PHP",
      "CodeIgniter 4",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "MySQL",
      "Git",
      "Bitbucket",
    ],
    contributions: [
      "Contributed to 3 production projects spanning AI applications, community platforms, and learning systems using Next.js, TypeScript, PHP, and MySQL.",
      "Integrated Ollama APIs into AI-powered features using contextual prompts, conversation history, user inputs, and fallback handling.",
      "Implemented 25+ REST APIs and contributed to 20+ pages covering communities, events, memberships, analytics, authentication, and admin workflows.",
      "Developed certification, referral, payment, and course management features, including certificate generation, reward tracking, and Razorpay integration.",
      "Implemented end-to-end learning workflows covering course purchases, progress tracking, quizzes, assignments, and certificate issuance.",
      "Resolved 30+ issues across API integrations, database operations, and UI workflows, improving application reliability and functionality.",
    ],
  },
  {
    id: 4,
    slug: "workshop-trainer-mentor",
    orgName: "Self-Employed",
    role: "Workshop Trainer & Mentor",
    isCurrent: true,
    workType: "Hustle",
    startYear: "2025",
    startMonth: "April",
    endMonth: "",
    endYear: "",
    technologiesUsed: ["Git", "GitHub"],
    contributions: [
      "Conducted 2 hands-on Git & GitHub workshop for 30 students.",
      "Topics covering branching, commits, pull requests, merge conflicts, and collaborative development workflows.",
    ],
  },
  {
    id: 3,
    slug: "teaching-assistant",
    orgName: "Stealth Startup",
    role: "Teaching Assistant",
    isCurrent: false,
    workType: "Part-time",
    startYear: "2025",
    startMonth: "November",
    endMonth: "March",
    endYear: "2026",
    technologiesUsed: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "MySQL",
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
    ],
    contributions: [
      "Supported students in solving 400+ queries related to Python programming, SQL, data handling, debugging, and backend workflows.",
      "Guided students through SQL joins, inefficient loops, logical errors, and structured debugging techniques, helping them better understand concepts and independently troubleshoot implementation issues.",
    ],
  },
  {
    id: 2,
    slug: "appointed-faculty",
    orgName: "Disha Computer Institute",
    role: "Appointed Faculty",
    isCurrent: false,
    workType: "Part-time",
    startYear: "2025",
    startMonth: "May",
    endMonth: "July",
    endYear: "2025",
    technologiesUsed: [
      "Python",
      "C",
      "C++",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    contributions: [
      "Taught core subjects including C, C++, Python, SQL, Data Structures, and problem-solving techniques to beginners and intermediate-level students.",
      "Designed hands-on coding sessions, powerful resources, assignment sheets, interactive doubt-clearing classes to strengthen conceptual understanding.",
      "Mentored students individually, helping them build logic, gain confidence, and prepare for assessments and interviews.",
      "Transformed personal stage fear into confident, clear communication and teaching.",
      "Created a positive, engaging, and doubt-friendly learning environment.",
    ],
  },
  {
    id: 1,
    slug: "junior-web-developer",
    orgName: "ShadowFox",
    role: "Junior Web Developer",
    isCurrent: false,
    workType: "Internship",
    startYear: "2024",
    startMonth: "May",
    endMonth: "June",
    endYear: "2024",
    technologiesUsed: ["HTML", "CSS", "JavaScript", "Git", "GitHub"],
    contributions: [
      "Worked on 3 web development tasks using HTML, CSS, and JavaScript, building and refining web interfaces.",
      "Contributed to the design and development of a client-facing coffee website, translating visual design concepts into an interactive and user-friendly experience.",
    ],
  },
];
