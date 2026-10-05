export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  status: string
  image: string
  links: {
    project?: string
    projectLabel?: string
    code?: string
    caseStudy?: string
    videoUrl?: string
    videoLabel?: string
    devpost?: string
  }
}


export const projects: Project[] = [
    {
      id: "012",
      title: "SONARE.LIVE",
      description:
        "What if your webcam was a rhythm game controller? A fully client-side lyric performance game built for the Hatsune Miku 'Magical Mirai 2026' Programming Contest. Draw shapes with your mouse or your bare hands to perform lyrics in real time. MediaPipe hand tracking with 1-Euro filtering feeds a custom shape-recognition pipeline, while a 4-layer procedural animation system drives a VRM character with lip-sync, music-driven emotion, and pointer-relative gaze. No UI framework, no backend, and inference runs in a Web Worker to protect render FPS.",
      tech: ["JavaScript", "Vite", "Three.js", "MediaPipe", "WebGL/GLSL", "Web Workers"],
      status: "COMPLETE",
      image: "/sonare.live.png",
      links: {
        project: "https://porukana.itch.io/sonarelive",
        projectLabel: "PLAY GAME",
        code: "https://github.com/Drakatoa/magical-mirai-competition-2026",
      },
    },
    {
      id: "002",
      title: "AEGIS",
      description:
        "A lightweight browser extension that puts trust and privacy back in the user's hands. Provides real-time website safety scores based on aggregated reviews and sentiment analysis, community-powered threat reporting for flagging dangerous sites automated scanners might miss, and smart autofill that restricts sensitive data to trusted sites only. Built with vanilla JavaScript for performance under 500KB.",
      tech: ["JavaScript", "Supabase", "Email.js", "Chrome Extensions API", "Figma"],
      status: "CASE STUDY",
      image: "/aegisproject.png",
      links: {
        // project: "https://drive.google.com/file/d/1r0OKNek3FWYNxlZFuWaseIb7fTSuNMB1/view?usp=sharing",
        code: "https://github.com/Drakatoa/Aegis",
        caseStudy: "/case-studies/aegis",
        videoUrl: "https://www.youtube.com/embed/5ndbzVFQ15c",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "003",
      title: "PROJECT PAWKOUR",
      description:
        "A third-person parkour game built in Unity where you control a cat escaping from a secret laboratory. Features fluid movement including running, jumping, dashing, and wall-running through a low-poly lab environment. Custom C# scripts handle physics-based movement, dynamic camera following, and adaptive music that intensifies with player velocity. Team project that combined animation, UI design, lighting, and custom audio composition.",
      tech: ["Unity", "C#", "OpenGL", "Figma"],
      status: "COMPLETE",
      image: "/projectpawkour.png",
      links: {
        // project: "https://drive.google.com/file/d/1-pmvv_ZrK1DE11ah-lo9y2lI_5p6kzeo/view?usp=sharing",
        code: "https://github.com/Drakatoa/Project-Pawkour",
        videoUrl: "https://drive.google.com/file/d/1mvEWaFJAOHNpSeNnPKCat9HdkTO29SjV/preview",
        videoLabel: "WATCH SPEEDRUN",
      },
    },
    {
      id: "001",
      title: "PREFACE",
      description:
        "A capstone project with Fisher Investments reimagining how hiring works. Instead of cover letters, applicants complete interactive, role-specific courses that build real skills and earn verifiable certificates. Employers get detailed assessment breakdowns across technical proficiency, soft skills, and values alignment. Built high-fidelity Figma prototypes and React components for the applicant dashboard and HR portal.",
      tech: ["Next.js", "TypeScript", "React", "Figma", "UX Research"],
      status: "CASE STUDY",
      image: "/prefaceproject.png",
      links: {
        project: "https://aed-preface.vercel.app/",
        projectLabel: "VIEW PROTOTYPE",
        code: "https://github.com/Drakatoa/aed-preface-atcm4341",
        caseStudy: "/case-studies/preface",
        videoUrl: "https://drive.google.com/file/d/1EEE9ZcNRo40xqruDH688TkFfKuZ9k0vG/preview",
        videoLabel: "WATCH PROMO",
      },
    },
    {
      id: "016",
      title: "APPEARA",
      description:
        "A VR survival game where you describe or sketch a weapon, then fight with it while defending a besieged space station. OpenAI turns speech, sketches and combat context into a structured weapon spec under a strict JSON schema, and Unity checks it against a balance budget before building the weapon. Built the weapon pipeline, the enemy AI that picks countermeasures against each weapon, and the ElevenLabs audio, and used Sentry traces to find the frame-time spikes that led to object pooling. Placed top 10 on the Sentry track at Hack the North 2026.",
      tech: ["Unity 6", "C#", "OpenXR", "OpenAI API", "ElevenLabs", "Sentry"],
      status: "COMPLETE",
      image: "/appeara.png",
      links: {
        code: "https://github.com/RiddhRam/Appeara",
        devpost: "https://devpost.com/software/ink-bound",
        videoUrl: "https://www.youtube.com/embed/M4CBEt53Thw",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "004",
      title: "AURALIS",
      description:
        "A sound generation platform that creates studio-quality audio effects from text prompts. Uses PyTorch AudioLDM for real-time synthesis with CUDA acceleration and Google Gemini for adaptive prompt refinement. Built the frontend with Next.js and Supabase auth, plus a Flask REST API backend for low-latency audio streaming. Includes a public sound library with likes and engagement tracking.",
      tech: ["Next.js", "Flask", "PyTorch AudioLDM", "PostgreSQL", "Supabase", "Gemini API"],
      status: "COMPLETE",
      image: "/auralisproject.png",
      links: {
        code: "https://github.com/Drakatoa/Auralis",
      },
    },
    {
      id: "005",
      title: "IDEATE - AI WHITEBOARD",
      description:
        "An ideation platform that turns hand-drawn sketches and written concepts into structured product blueprints. It generates flowcharts, business pitches, competitive analyses, and 90-day roadmaps using NVIDIA Nemotron's vision and text models. Built the interactive whiteboard with Canvas API for precise drawing and shape recognition, plus Next.js REST APIs for sketch analysis and Mermaid diagram generation. Won top-5 at HackUTD 2025 for the NVIDIA track.",
      tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "Nemotron", "Canvas API"],
      status: "COMPLETE",
      image: "/ideateproject.png",
      links: {
        project: "https://ideatehackutd2025.vercel.app/",
        code: "https://github.com/Drakatoa/ideatehackutd2025",
        devpost: "https://devpost.com/software/ideate-mratxn",
        videoUrl: "https://www.youtube.com/embed/2ebeNaF3sto",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "013",
      title: "ARRESTORIQ",
      description:
        "10,000+ flame arrestor configurations, one validated platform. An industry-sponsored UTD capstone for Emerson unifying test data, CFD simulation, and bill-of-materials records in a single cross-platform desktop and mobile app. Data is ingested through the Emerson Data Interchange standard via a Haxe-compiled parsing engine that runs natively in both JavaScript and Python. The full product catalog is embedded for offline-first operation, a regression engine fits four model types to pressure-drop data for cross-product comparison, and hierarchical BOM trees deep-link into Emerson's records, with search running ~5x faster than Emerson's internal tool.",
      tech: ["React Native", "Expo", "Electron", "TypeScript", "Haxe", "Python"],
      status: "COMPLETE",
      image: "/arrestoriq.png",
      links: {
        project: "/arrestoriqposter.pdf",
        projectLabel: "VIEW POSTER",
      },
    },
    {
      id: "014",
      title: "EUKARYA",
      description:
        "Evolve from a single cell to a creature that walks on land. A Unity evolution simulator spanning six evolutionary stages across both 2D top-down and full 3D environments, including a transition mechanic that lets you breach the water's surface. Built the camera system, UI/UX, and audio architecture with a persistent cross-scene music manager, plus health, stamina, and overhealth mechanics driven by an edge-detection state machine that fires damage exactly once per attack.",
      tech: ["Unity", "C#", "Blender", "Figma"],
      status: "COMPLETE",
      image: "/eukarya.png",
      links: {
        code: "https://github.com/a-sriel/Eukarya",
      },
    },
    {
      id: "006",
      title: "DESIGN FOR INCLUSION",
      description:
        "HCI research on nonbinary student experiences at UTD after 28% reported not feeling a sense of belonging. Conducted qualitative interviews that revealed students only found resources through informal networks and existing policies lacked enforcement. Proposed interventions including a centralized LGBTQ+ resource hub, anonymous feedback system for misgendering incidents, and inclusive event feed. Presented findings to UTD faculty and administration.",
      tech: ["User Research", "Figma", "Miro"],
      status: "CASE STUDY",
      image: "/deiproject.png",
      links: {
        caseStudy: "/case-studies/inclusion",
        project: "/Design Research Final Presentation - Rajit Goel.pdf",
        projectLabel: "VIEW PRESENTATION",
      },
    },
    {
      id: "007",
      title: "HACKMATE",
      description:
        "A web platform for connecting hackathon participants and forming teams. Built frontend components with React for navigation, group management tools, and contact forms integrated with backend APIs. Focused on making team formation and project collaboration feel smooth and intuitive.",
      tech: ["React", "CSS", "Figma"],
      status: "COMPLETE",
      image: "/hackmateproject.png",
      links: {
        code: "https://github.com/Evelas78/HackMate",
      },
    },
    {
      id: "015",
      title: "CATFISH",
      description:
        "A five-minute dating-safety game that trains players to spot romance scams. You chat with three matches at once: a friend who joins from their phone through a QR code, a bot, and a long-con scammer, while the round jumps ahead through days 1, 3, 7 and 14. Built the full stack, the game server and the AI personas: the server owns the secret roles and scoring, deterministic rules tag 12 red-flag signals with no LLM judging evidence, and OpenAI and xAI Grok play the matches while ElevenLabs voices the scammer's voice notes. Made at HackGT 13 with a team of two.",
      tech: ["React", "TypeScript", "Vite", "WebSockets", "Upstash Redis", "OpenAI", "xAI Grok", "ElevenLabs"],
      status: "COMPLETE",
      image: "/catfish.png",
      links: {
        project: "https://catfish-eight.vercel.app",
        projectLabel: "PLAY IT",
        devpost: "https://devpost.com/software/catfish-training-against-romance-scams",
        videoUrl: "https://www.youtube.com/embed/tHjDgC-W2qI",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "008",
      title: "HOMETOWN OLYMPICS: NEW DELHI",
      description:
        "A visual identity system for a hypothetical 2024 Olympics hosted in New Delhi. The design celebrates India's vibrant culture through a lotus-inspired logo that merges the national flower with the Olympic torch. Drew from New Delhi's rich heritage including Mughal architecture, street markets, and festivals like Diwali and Holi. Created cohesive branding with traditional Indian textile patterns in saffron, maroon, gold, and purple to reflect courage, passion, and royalty.",
      tech: ["Figma", "Graphic Design", "Branding"],
      status: "CASE STUDY",
      image: "/delhiproject.png",
      links: {
        caseStudy: "/case-studies/delhi-olympics",
      },
    },
    {
      id: "009",
      title: "ZENZ",
      description:
        "An AI-powered mental health app designed to help users manage stress, practice mindfulness, and track emotional well-being in the post-pandemic world. Features guided meditation sessions for relaxation, journaling and mood tracking for self-reflection, AI-based mental health support, and personalized wellness activities. Created calming visual identity with lotus imagery and serene color palette (light blue, pink, beige) to promote peace and emotional resilience through daily wellness practices.",
      tech: ["Figma", "UI/UX Design", "Mobile Design"],
      status: "CASE STUDY",
      image: "/zenzproject.png",
      links: {
        caseStudy: "/case-studies/zenz",
        project: "https://www.figma.com/proto/kgl4D7CnXkYnVTUd5uUc8E/Interaction-Design-I?page-id=0%3A1&node-id=103-626&viewport=-6646%2C1159%2C0.16&t=1hv8o1n7IASxqHeI-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=103%3A626",
        projectLabel: "VIEW PROTOTYPE",
      },
    },
    {
      id: "010",
      title: "ARC",
      description:
        "A human-centered IoT fitness ecosystem that transforms raw workout data into meaningful insights. Uses AI to interpret effort quality, near-failure moments, and recovery patterns rather than just counting reps. Features adaptive visualizations, real-time form guidance through wearables, and social progress sharing. Designed to make fitness more mindful and motivating by revealing the invisible effort that drives real growth through intelligent feedback and community connection.",
      tech: ["Figma", "IoT Design", "UI/UX Design", "Mobile Design"],
      status: "CASE STUDY",
      image: "/arcproject.png",
      links: {
        caseStudy: "/case-studies/arc",
        project: "https://www.figma.com/proto/6SD371fF4AKi2JseX9QSwZ/ARC?page-id=0%3A1&node-id=15-12&viewport=573%2C-79%2C0.26&t=aKwp36k0FRYIXUSb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=15%3A12",
        projectLabel: "VIEW PROTOTYPE",
      },
    },
    {
      id: "011",
      title: "UTD CSA SHIRT DESIGN",
      description:
        "A brand design project for UTD Chinese Student Association's shirt for the 2025-2026 academic year. Created a playful grunge-style design featuring Wang, our cute tiger mascot, riding a Lao Gan Ma rocket bottle. The design celebrates the '5 Spices' theme representing our family groups, with a front emblem that playfully references P.F. Chang's with 'P.F. Wang's.' Collaborated with Chloe Tee and Liz Michel on art and design while handling layout, typography, and overall composition.",
      tech: ["Figma", "Graphic Design", "Branding"],
      status: "CASE STUDY",
      image: "/csaproject.png",
      links: {
        caseStudy: "/case-studies/utd-csa",
      },
    },
  ]
