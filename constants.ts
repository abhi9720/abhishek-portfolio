
import React from 'react';
import { Experience, Project, SkillCategory, Link, KeyHighlight, CategorizedSkillGroup, Certification } from './types';
import { IconMail } from './components/icons/IconMail';
import { IconGitHub } from './components/icons/IconGitHub';
import { IconLinkedIn } from './components/icons/IconLinkedIn';
import { IconGlobe } from './components/icons/IconGlobe';
import { IconNote } from './components/icons/IconNote';
import { IconLeetCode } from './components/icons/IconLeetCode';
import { IconDevTo } from './components/icons/IconDevTo';
import { IconMedium } from './components/icons/IconMedium';
import { IconTrophy } from './components/icons/IconTrophy';
import { IconCode } from './components/icons/IconCode';
import { IconCloud } from './components/icons/IconCloud';
import { IconDatabase } from './components/icons/IconDatabase';
import { IconApi } from './components/icons/IconApi';
import { IconBrain } from './components/icons/IconBrain';
import { IconSparkles } from './components/icons/IconSparkles';

// Configuration Flags
export const SHOW_LEARNING_AND_RESEARCH = true;
export const SHOW_GITHUB_ACTIVITY = false;

export const PERSONAL_INFO = {
  name: 'Abhishek “Abhi” Tiwari',
  nickname: 'abhi9720',
  title: 'SDE-II | Backend Engineer (Java + Go) | Scalable Systems | AI/LLM Engineering',
  location: 'Bangalore / Gwalior, India',
  email: 'abhishek.nitmn@gmail.com',
  phone: '+91-9876543210',
  photoUrl: 'https://avatars.githubusercontent.com/u/68281476?v=4',
  summary: 'Backend-leaning full-stack Software Engineer with strong foundations in Golang, Java, Spring Boot, Distributed Systems, and Cloud Architecture. Proven experience handling high-load systems (100K+ req/day), real-time pipelines, and LLM-based applications. Fast adopter of emerging technologies like vector search, RAG, and Kubernetes-based microservices.',
};

export const RESUME_LINK = 'https://drive.google.com/file/d/1UWDYhLGwUqb5UhvK9uq5nN1GkCFxF3FQ/preview';

export const SOCIAL_LINKS: Link[] = [
  { name: 'GitHub', url: 'https://github.com/abhi9720', icon: React.createElement(IconGitHub) },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhi9720', icon: React.createElement(IconLinkedIn) },
  { name: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: React.createElement(IconMail) },
  { name: 'Portfolio', url: 'https://abhi9720.netlify.app', icon: React.createElement(IconGlobe) },
  { name: 'Notes & Blog', url: 'https://abhisheks-notes.super.site', icon: React.createElement(IconNote) },
  { name: 'LeetCode', url: 'https://leetcode.com/abhi9720', icon: React.createElement(IconLeetCode) },
  { name: 'DEV.to', url: 'https://dev.to/abhi9720', icon: React.createElement(IconDevTo) },
  { name: 'Medium', url: 'https://medium.com/@Abhishektiwari', icon: React.createElement(IconMedium) },
];

export const KEY_HIGHLIGHTS: KeyHighlight[] = [
    {
        metric: '100K+ req/day',
        description: 'Designed & optimized high-load microservices, reducing latency by 35%.',
        icon: React.createElement(IconTrophy)
    },
    {
        metric: '99.9% Reliability',
        description: 'Architected a resilient async distributed task system with DLQ & monitoring.',
        icon: React.createElement(IconTrophy)
    },
    {
        metric: '50K+ Daily Users',
        description: 'Engineered real-time gamification & WebSocket pipelines.',
        icon: React.createElement(IconTrophy)
    },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Development Engineer I',
    company: 'PeopleStrong',
    logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/ab66b1e4377e0bcf02fee7845cad0216/peoplestrong-technologies-pvt-ltd-peoplestrong.svg',
    period: 'Apr 2024 – Present',
    location: 'Bangalore, India',
    description: [
      'Built microservices using Java + Spring Boot handling 100K+ requests/day with 35% latency improvement using Redis caching and connection pooling.',
      'Developed a real-time gamification engine and ILT attendance system processing 50K+ daily API calls using Go, Kafka, and Redis.',
      'Designed a secure RBAC system using Spring Security and industry design patterns.',
    ],
    summary: 'Built scalable Java microservices for 100K+ daily requests and a real-time gamification engine with Go & Kafka. Optimized latency by 35% using Redis and designed a secure RBAC system.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Imperva',
    logo: 'https://www.imperva.com/wp-content/uploads/2025/08/Imperva-dark.svg',
    period: 'Nov 2023 – Mar 2024',
    location: 'Bangalore, India',
    description: [
      'Created a distributed async task system using Go, Redis, Asynq, integrated DLQ handling and monitoring via Prometheus.',
      'Deployed the system on Kubernetes with auto-scaling, achieving 99.9% success rate.',
    ],
    summary: 'Developed a resilient, distributed async task system in Go with Redis and Asynq, deployed on Kubernetes. Achieved 99.9% reliability with integrated monitoring via Prometheus and DLQ handling.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Nagarro',
    logo: 'https://companieslogo.com/img/orig/NA9.DE-ebeff140.png?t=1720244493',
    period: 'Mar 2023 – Nov 2023',
    location: 'Noida, India',
    description: [
      'Optimized Spring Boot APIs using Hibernate-level caching for 25% performance boost.',
      'Migrated Oracle SQL workloads to SQL Server, improving execution by 30%.',
      'Deployed services on AWS (EC2, RDS, S3, VPC) ensuring high uptime.',
    ],
    summary: 'Boosted Spring Boot API performance by 25% via Hibernate caching and optimized database workloads by 30% through SQL migration. Deployed and managed highly available services on AWS.',
  },
];

export const PROJECTS: Project[] = [
    {
        title: 'Smart Classification Engine',
        category: 'AI',
        tech: ['Python', 'GTE-Large Embeddings', 'LightGBM', 'LLM', 'AsyncIO', 'Batch Processing', 'Parallelization'],
        tags: ['#NLP', '#Embeddings', '#HighScale', '#LLM', '#AsyncIO', '#Classification'],
        description: 'A highly efficient, centralized classification engine that processes millions of messages per second, classifying them as relevant or irrelevant while capturing nuanced information such as sentiment, appreciation, criticism, and actionable insights. Built with Python, it uses semantic embeddings with LightGBM for primary classification, applies score thresholds, and leverages LLM fallback for ambiguous cases. Supports batch processing, async concurrency, and parallelization for fast, private, and scalable deployment.',
        link: 'https://github.com/abhi9720/smart-classification-engine',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=Classification+Engine&font=inter'
    },
    {
        title: 'BankingPortal-API',
        category: 'Backend',
        tech: ['Spring Boot', 'JWT', 'MySQL', 'Angular'],
        tags: ['#API', '#Security', '#FinTech'],
        description: 'Secure REST API with role-based access for modern banking operations, including a full frontend with Angular.',
        link: 'https://github.com/abhi9720/BankingPortal-API',
        liveDemoUrl: '#',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=Banking+API&font=inter',
    },
     {
        title: 'AI Resume Analyzer',
        category: 'AI',
        tech: ['Python', 'LangChain', 'OpenAI', 'VectorDB'],
        tags: ['#LLM', '#RAG',],
        description: 'A smart tool to analyze resumes, extract key info, and score them against job descriptions using modern AI.',
        link: 'https://github.com/abhi9720/ai-resume-analyzer',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=AI+Analyzer&font=inter',
    },
    {
        title: 'CoderTab',
        category: 'Frontend',
        tech: ['React', 'Monaco Editor', 'Tailwind CSS'],
        tags: ['#IDE', '#Web-Tools', '#Real-Time'],
        description: 'A web-based IDE for multiple languages with custom themes, code execution, and sharing capabilities.',
        link: 'https://github.com/abhi9720/CoderTab',
        liveDemoUrl: '#',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=CoderTab&font=inter',
    },
    {
        title: 'Pastebin',
        category: 'Full-Stack',
        tech: ['Go', 'React', 'PostgreSQL', 'Redis'],
        tags: ['#Full-Stack', '#High-Performance', '#Go'],
        description: 'A modern Pastebin alternative with a high-performance Go backend and a clean React frontend.',
        link: 'https://github.com/abhi9720/pastebin-clone-go-react',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=Pastebin&font=inter'
    },
    {
        title: 'Postgram',
        category: 'Full-Stack',
        tech: ['React', 'Express.js', 'MongoDB', 'Socket.io'],
        tags: ['#Social-Media', '#Real-Time', '#MERN'],
        description: 'Full-stack social media clone with image uploads, follows, likes, comments, and real-time chat functionality.',
        link: 'https://github.com/abhi9720/Postgram',
        liveDemoUrl: '#',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=Postgram&font=inter',
    },
    {
        title: 'NotePad PWA',
        category: 'Frontend',
        tech: ['HTML', 'JavaScript', 'IndexedDB', 'PWA'],
        tags: ['#Offline-First', '#Web-APIs', '#Utility'],
        description: 'An offline-first Progressive Web App for notes, to-dos, and image resizing, installable on any device.',
        link: 'https://github.com/abhi9720/NotePad-PWA',
        imageUrl: 'https://placehold.co/1280x720/1e293b/f1f5f9/png?text=NotePad+PWA&font=inter'
    }
];

export const SKILLS: SkillCategory[] = [
    { name: 'Languages', skills: ['Java', 'Golang', 'TypeScript', 'JavaScript (ES6)', 'Python'] },
    { name: 'Frontend', skills: ['React.js', 'Angular 10', 'Tailwind CSS', 'HTML', 'CSS', 'EJS'] },
    { name: 'Backend', skills: ['Spring Boot', 'Hibernate', 'GORM', 'Gin', 'FastAPI', 'Node.js', 'Express.js'] },
    { name: 'Databases', skills: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Oracle SQL'] },
    { name: 'Infrastructure', skills: ['AWS (EC2, RDS, S3, VPC, Lambda)', 'Docker'] },
    { name: 'Messaging', skills: ['Apache Kafka', 'Socket.io'] },
    { name: 'Monitoring', skills: ['Prometheus'] },
    { name: 'Tools & DevOps', skills: ['Git', 'Swagger', 'Postman', 'Maven', 'Bash', 'IndexedDB'] },
    { name: 'AI/ML', skills: ['OpenAI API', 'LangChain', 'LLM Integration', 'Vector DBs (RAG)'] },
    { name: 'Other', skills: ['JWT', 'WebSockets', 'System Design', 'Algorithm Optimization'] },
];

export const CURRENT_INTERESTS: string[] = [
    'Golang concurrency patterns',
    'LangChain.js & OpenAI APIs',
    'Kubernetes advanced use cases (Helm, ArgoCD)',
    'System Design + Real-time distributed systems',
    'AI-enhanced developer tools (LLM + Web IDEs)',
];

const BASE_CATEGORIES: CategorizedSkillGroup[] = [
    {
        name: 'AI & LLM Engineering',
        icon: React.createElement(IconSparkles, { className: 'h-6 w-6' }),
        skills: ['LangChain', 'OpenAI Agent SDK', 'RAG Pipelines', 'Vector Databases', 'Prompt Engineering', 'LLM Orchestration', 'Python'],
    },
    {
        name: 'Core Backend Technologies',
        icon: React.createElement(IconCode, { className: 'h-6 w-6' }),
        skills: ['Java', 'Spring Boot', 'Golang', 'Gin', 'FastAPI', 'Node.js', 'Express.js', 'Hibernate', 'GORM', 'Microservices', 'System Design', 'Algorithms'],
    },
    {
        name: 'Data & Storage Systems',
        icon: React.createElement(IconDatabase, { className: 'h-6 w-6' }),
        skills: ['MySQL', 'PostgreSQL', 'Redis (Caching/Queues)', 'MongoDB', 'Oracle SQL', 'IndexedDB'],
    },
    {
        name: 'Infrastructure & Services',
        icon: React.createElement(IconCloud, { className: 'h-6 w-6' }),
        skills: [
            'AWS (EC2, RDS, S3, VPC)', 
            'Docker', 
            'Apache Kafka', 
            'Socket.io', 
            'REST APIs', 
            'gRPC', 
            'JWT Auth', 
            'Swagger/OpenAPI'
        ],
    },
];

export const SKILL_CATEGORIES: CategorizedSkillGroup[] = SHOW_LEARNING_AND_RESEARCH
    ? [
        ...BASE_CATEGORIES,
        {
            name: 'Learning & Research',
            icon: React.createElement(IconBrain, { className: 'h-6 w-6' }),
            skills: [...CURRENT_INTERESTS],
        }
    ]
    : BASE_CATEGORIES;


export const EDUCATION = {
  degree: 'B.Tech in Computer Science & Engineering',
  institution: 'National Institute of Technology, Manipur',
  period: '2019 – 2023',
  cgpa: '8.8 CGPA',
  coursework: ['Algorithms', 'Databases', 'Operating Systems', 'Computer Networks', 'Machine Learning'],
};

export const CERTIFICATIONS: Certification[] = [
    
    {
        name: 'Go Design Patterns',
        issuer: 'LinkedIn Learning',
        date: 'Issued 2024',
        link: 'https://www.linkedin.com/learning/certificates/a2a68ce48c6bfcb1d026d6520489947e5090d40bef43a5f236273a283732aaba',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
    },
    {
        name: 'Go Essentials: Concurrency, Connectivity, and High-Performance Apps',
        issuer: 'LinkedIn Learning',
        date: 'Issued 2024',
        link: 'https://www.linkedin.com/learning/certificates/197ad5e18a4689e92958c06011c00ddbb71e3de21b731b277864fb637696791f?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BLccALGFBQ%2Fy9Vww%2BMuP4Jw%3D%3D',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
    }
];
