export interface Projects {
  id: number;
  slug: string;
  year: string;
  title: string;
  role: string;
  links: {
    github?: string;
    live?: string;
    media?: string;
  };
  description: string;
  isCurrent: boolean;
  technologiesUsed: string[];
  contributions: string[];
}

export const projects: Projects[] = [
  {
    id: 6,
    slug: "url-shortener",
    year: "2026",
    title: "Urllio - URL Shortener",
    description:
      "Shorten, manage, and track your links with urll.io, a fast and simple URL shortener with analytics and QR codes.",
    role: "Full-Stack Developer",
    isCurrent: true,
    links: {
      github: "https://github.com/prashant-g0/url_shortner",
      live: "https://urllio.vercel.app/",
      media: "/user/project/urllio.png",
    },
    technologiesUsed: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "uv",
      "JWT",
      "Git",
      "GitHub",
      "Vercel",
      "Render",
    ],
    contributions: [
      "urll.io turns long, unwieldy URLs into short, shareable, and trackable links.",
      "Registered users unlock a full dashboard: link analytics, expiration controls, QR codes, and centralized link management.",
      "The platform is built on a clean, production-style architecture; a Next.js frontend, a FastAPI backend, and Supabase/PostgreSQL for data and auth.",
      "Designed to be fast, secure, and easy to extend.",
    ],
  },
  {
    id: 5,
    slug: "blush-messaging-app",
    year: "2026",
    title: "Blush Messaging App",
    description:
      "Blush is a secure space for unsaid words. Send a private message that vanishes after one read, or post an anonymous secret to the public wall -created for moments meant to be felt, not stored.",
    role: "Full-Stack Developer",
    isCurrent: true,
    links: {
      github: "https://github.com/prashant-g0/blush-messaging-app",
      live: "https://blushnow.streamlit.app/",
      media: "/user/project/blush_app.png",
    },
    technologiesUsed: [
      "Streamlit",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Fernet / AES-256",
      "bcrypt",
      "uv",
      "Git",
      "GitHub",
    ],
    contributions: [
      "Blush is a secure, anonymous, and ephemeral messaging platform built for moments that shouldn't live forever.",
      "Core features include Anonymous Two-Way Conversations, Ephemeral Messaging, and a Public Wall for sharing secrets.",
      "Security is ensured through end-to-end encryption using Fernet (AES-256) and password hashing with bcrypt.",
    ],
  },
  {
    id: 4,
    slug: "ml-model-breast-cancer-detection",
    year: "2025",
    title: "Breast Cancer Detection ML Model",
    description:
      "A machine learning-based web app that predicts whether a breast tumor is Benign or Malignant using 29 medical features. Users can input data manually or upload a PDF report for automatic feature extraction. Built with Flask, Bootstrap, and PyMuPDF.",
    role: "Machine Learning Developer",
    isCurrent: false,
    links: {
      github:
        "https://github.com/prashant-g0/breast-cancer-detection-using-machine-learning",
      media: "/user/project/breast_cancer.png",
    },
    technologiesUsed: [
      "Flask",
      "Python",
      "scikit-learn",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "joblib",
      "pickle",
      "Git",
      "GitHub",
    ],
    contributions: [
      "This project is a Breast Cancer Prediction Web App that utilizes machine learning to assist in diagnosing breast cancer.",
      "The model takes 29 important features as input and predicts whether the tumor is Benign (Non-Cancerous) or Malignant (Cancerous).",
      "Users can either manually enter features or upload a medical report (PDF) for automatic extraction.",
      "Achieved an accuracy of 92% on the test dataset.",
    ],
  },
  {
    id: 3,
    slug: "ml-model-crush-predictor",
    year: "2025",
    title: "Human Likeliness Prediction ML Model",
    description:
      "A fun, lightweight machine learning web app that predicts the likelihood that your crush likes you back based on 10 behavioral inputs. This project is built using Streamlit, making it super easy to run and deploy.",
    role: "Machine Learning Developer",
    isCurrent: false,
    links: {
      github:
        "https://github.com/prashant-g0/ml-model-crush-predictor-streamlit-app",
      live: "https://crushpredictor.streamlit.app/",
      media: "/user/project/crush_prediction.png",
    },
    technologiesUsed: [
      "Streamlit",
      "Python",
      "scikit-learn",
      "pandas",
      "numpy",
      "matplotlib",
      "seaborn",
      "joblib",
      "pickle",
      "Git",
      "GitHub",
      "Random Forest Regressor",
    ],
    contributions: [
      "Developed a machine learning model using Random Forest Regressor to predict the likelihood of a crush liking you back based on 10 behavioral inputs.",
      "Features include initiates_conversation, engagement, quick_responses, eye_contact, joke_responses, nervous, stays_near_you, helps_you, takes_you_out, smiles.",
      "Achieved an accuracy of 77% on the test dataset.",
    ],
  },
  {
    id: 2,
    slug: "pdf-management-system",
    year: "2024",
    title: "PDF Management System",
    description:
      "A Python-based PDF manager that handles tasks like PDF to DOCX conversion, PDF to image, and more. Simple, efficient, and easy to use.",
    role: "Lead Developer",
    isCurrent: false,
    links: {
      github: "https://github.com/prashant-g0/pdf-management-tool-python",
      media: "/user/project/projects.jpg",
    },
    technologiesUsed: [
      "Flask",
      "Python",
      "pikepdf",
      "docx2pdf",
      "pdf2image",
      "pdf2docx",
      "Git",
      "GitHub",
    ],
    contributions: [
      "The PDF Management Tool is a Python-based web application designed to help users efficiently manage their PDF documents.",
      "This tool simplifies PDF handling and enhances document accessibility.",
      "Features include converting PDF to DOCX and DOCX to PDF, extracting images from PDFs, merging multiple PDFs, splitting PDFs into separate files, encrypting PDFs with a password",
    ],
  },
  {
    id: 1,
    slug: "canteen-management-system",
    year: "2024",
    title: "Canteen Management System",
    description:
      "This is a canteen website build using HTML, CSS, JS and External APIs. This website serves security in payment system and great user experience.",
    role: "Frontend Developer",
    isCurrent: false,
    links: {
      github: "https://github.com/prashant-g0/bhojnalaya_2.0",
      live: "https://bhojnalayaapp.netlify.app/",
      media: "/user/project/bhojnalaya.png",
    },
    technologiesUsed: ["HTML", "CSS", "JavaScript", "Git", "GitHub"],
    contributions: [
      "Bhojnalaya is a smart canteen management system designed to eliminate fraud in college canteens. The idea originated from a common scam where students were reusing UPI payment screenshots to claim multiple meals without actually paying for them.",
      "To solve this, Bhojnalaya introduces a digital bill generation system that creates a QR-coded bill after a successful payment. This QR code stores order details, payment verification, and a unique identification number.",
      "At the canteen counter, the QR code is scanned for validation—ensuring that each meal is served only once per payment, thus eliminating the scam.",
    ],
  },
];
