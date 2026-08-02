// Real content sourced from the existing PORTFOLIO_SAHIL Flask project (data.py).
// Do not invent new content here — only reshape/format for the new UI.

export const personal = {
  name: "Sahil Khan",
  title: "Python Full Stack Developer",
  subtitle: "Backend Developer · Python FullStack Enthusiast",
  tagline: "From localhost to production, I speak fluent Python.",
  email: "sahilkhan67sh@gmail.com",
  phone: "+91 8895207678",
  linkedinUrl: "https://www.linkedin.com/in/sahil--dev--py/",
  githubUrl: "https://github.com/Sksahilkhan67sh",
  leetcodeUrl: "https://leetcode.com/u/sksahilkhan67sh/",
  location: "Marathahalli, Bangalore",
  summary:
    "Python Full Stack Developer (B.Tech CSE '26) with two production internships delivering scalable backend systems, REST APIs, and ML-integrated web applications. Core stack: Python, Flask, Django, JavaScript, and React.js — with hands-on experience in Docker, Kafka, Redis, and cloud deployment on Render and Vercel. Built real-world projects including a live streaming platform and an ML-powered phishing detection API. Seeking a full-time role to engineer clean, scalable, and impactful Python-driven solutions.",
  resumeUrl:
    "https://drive.google.com/file/d/1azbvZKthJLWghnuyRfuQayiKfeFnhrDy/view",
};

export const skills = [
  {
    category: "Languages",
    icon: "code",
    skills: ["Java", "Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Tools",
    icon: "layers",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "Django",
      "Spring Data JPA",
      "Flask",
      "EJS",
      "NPM",
    ],
  },
  {
    category: "Databases",
    icon: "database",
    skills: ["MySQL", "Docker", "MongoDB"],
  },
  {
    category: "Technologies",
    icon: "cpu",
    skills: ["REST APIs", "Git", "GitHub", "Postman", "PyCaret", "scikit-learn"],
  },
];

export const experience = [
  {
    company: "Codec Technologies",
    role: "Full Stack Developer Intern",
    type: "Hybrid",
    duration: "March 2025 – June 2025",
    current: false,
    description:
      "Worked as a Full Stack Developer Intern at Codec Technology, contributing to the design, development, and deployment of web applications across the full technology stack. Collaborated with cross-functional teams to build responsive and scalable front-end interfaces using modern frameworks, while developing and maintaining robust back-end services, RESTful APIs, and database integrations. Participated in the complete software development lifecycle — from requirement gathering and system design to testing and production deployment.",
  },
  {
    company: "Future Intern",
    role: "FullStack Developer Intern",
    type: "Hybrid",
    duration: "March 2026 – April 2026",
    current: false,
    description:
      "Worked as a Full Stack Developer Intern at Future Intern, where I contributed to the development of web applications by working on both front-end and back-end technologies. Gained practical experience in designing responsive user interfaces, developing server-side functionalities, managing databases, and integrating APIs.",
  },
  {
    company: "JSpider",
    role: "Python Full-Stack Developer",
    type: "Bengaluru",
    duration: "April 2026 – November 2026",
    current: true,
    description:
      "Currently working as a Python Full Stack Trainee at JSpiders, gaining hands-on experience in designing, developing, and deploying web applications using Python and modern web technologies. Actively involved in building responsive web applications, implementing REST APIs, debugging code, and following software development best practices.",
  },
];

export const projects = [
  {
    title: "Webhook Delivery Service",
    type: "Self Project",
    description:
      "A backend service that reliably delivers webhook events to external URLs with automatic retries, exponential backoff, API key authentication, rate limiting, and a real-time monitoring dashboard. Built entirely with Python's standard library — no frameworks.",
    tech: [
      "Python",
      "REST API",
      "Docker",
      "SQLite",
      "HMAC",
      "JWT",
      "Rate Limiting",
    ],
    github: "https://github.com/Sksahilkhan67sh/Sahil_Khan_Nestack_Submission",
    demo: "https://sahil-khan-nestack-submission-2obk.onrender.com/dashboard",
    image: "webhook",
  },
  {
    title: "Stream Vault",
    type: "Self Project",
    description:
      "A web-based media streaming application built to store and stream video content with a focus on performance and scalability. Built with a Flask backend, integrated with Redis and LiveKit Server for real-time streaming, and deployed with Docker for production use.",
    tech: ["Python", "Flask", "Docker", "Redis", "LiveKit Server"],
    github: "https://github.com/Sksahilkhan67sh/MY-STREAM-VIBES",
    demo: "https://my-stream-vibes-client.vercel.app/",
    image: "streamvault",
  },
  {
    title: "Python Phishing URL Detection",
    type: "Self Project",
    description:
      "An end-to-end machine learning pipeline in Python to classify URLs as phishing or legitimate in real time, with automated feature extraction from domain structure, protocol, metadata, WHOIS records, and HTTP response data. Deployed as a real-time Flask web application with a REST API.",
    tech: ["Python", "PyCaret", "Flask", "scikit-learn", "WHOIS API"],
    github: "https://github.com/Sksahilkhan67sh/physhing-url-detector",
    demo: "https://physhing-url-detector.vercel.app/",
    image: "phishguard",
  },
  {
    title: "My Portfolio",
    type: "Self Project",
    description:
      "A production-grade personal portfolio engineered with Python Flask and Jinja2 templating, designed to professionally present my expertise as a Python Full Stack Developer with specialized backend capabilities.",
    tech: ["Python Flask", "Jinja2", "HTML", "CSS", "JavaScript", "Gunicorn"],
    github: "https://github.com/Sksahilkhan67sh/PORTFOLIO_SAHIL",
    demo: "https://portfolio-sahil-blond.vercel.app/",
    image: "portfolio",
  },
  {
    title: "Musical Web",
    type: "Self Project",
    description: "Under development.",
    tech: ["Python", "Kafka", "Flask", "Docker", "Redis", "LiveKit Server"],
    github: "https://github.com/Sksahilkhan67sh/DROP-INCOMING",
    demo: "https://drop-incoming.vercel.app/",
    image: "musicalweb",
  },
];

export const education = [
  {
    institution: "GITA Autonomous College",
    degree: "B.Tech in Computer Science",
    location: "Bhubaneswar, Odisha",
    duration: "2022 – 2026",
    current: true,
  },
  {
    institution: "Municipal Higher Secondary School",
    degree: "Higher Secondary Education",
    location: "Rourkela, Odisha",
    duration: "2020 – 2022",
    current: false,
  },
];

export const extracurricular = [
  {
    title: "Cultural Fest Coordinator",
    description:
      "Spearheaded event logistics and participant coordination for the annual college cultural festival, ensuring seamless execution across multiple concurrent events.",
  },
  {
    title: "Cultural Fest Promoter",
    description:
      "Drove social media engagement on Instagram through original creative content, boosting event visibility and student participation.",
  },
];
