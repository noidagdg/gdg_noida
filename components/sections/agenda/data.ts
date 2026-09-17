export interface Speaker {
  name: string;
  designation?: string;
  avatar?: string;
  company?: string;
}

export interface Session {
  id: string | number;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  hasQnA?: boolean;
  speakers?: Speaker[];
}

export interface Track {
  id: string;
  name: string;
  color: string;
  sessions: Session[];
}

export const tracks: Track[] = [
  {
    id: "think",
    name: "Think",
    color: "#4285F4",
    sessions: [
      {
        id: "t1",
        startTime: "09:00",
        endTime: "09:30",
        title: "Registrations",
      },
      {
        id: "t2",
        startTime: "10:00",
        endTime: "10:30",
        title: "Opening Note",
      },
      {
        id: "t3",
        startTime: "10:30",
        endTime: "11:00",
        title: "Introduction by Google",
      },
      {
        id: "t4",
        startTime: "11:00",
        endTime: "11:20",
        title: "Journey of Entrepreneurship from Ideation to Funding",
        speakers: [
          {
            name: "Mamta Kumari",
          },
        ],
      },
      {
        id: "t5",
        startTime: "11:25",
        endTime: "11:45",
        title: "Design for Social Impact",
        speakers: [
          {
            name: "Akshata Malhotra",
          },
        ],
      },
      {
        id: "t6",
        startTime: "11:55",
        endTime: "12:15",
        title:
          "Replacing Human Departments with AI Swarm: Designing Systems beyond Human Accuracy",
        speakers: [
          {
            name: "Aashish Pahwa",
            designation: "Founder - koso.ai",
          },
        ],
      },
      {
        id: "t7",
        startTime: "12:20",
        endTime: "12:40",
        title:
          "Human Defaults And Desires: How Behavior Shapes Product Choice?",
        speakers: [
          {
            name: "Paromita Saha",
          },
        ],
      },
      {
        id: "t8",
        startTime: "12:45",
        endTime: "13:10",
        title: "Co-Creation Era: How AI Joins the Design Team",
        speakers: [
          {
            name: "Sujit Kumar Pradhan",
            designation: "UX Designer",
          },
        ],
      },
      {
        id: "t9",
        startTime: "13:10",
        endTime: "13:40",
        title: "Lunch",
      },
      {
        id: "t10",
        startTime: "13:45",
        endTime: "14:00",
        title: "Fun Activity",
      },
      {
        id: "t11",
        startTime: "14:20",
        endTime: "14:55",
        title:
          "The Invisible Patterns of Nature: Laws that Quietly Shape Our World",
        speakers: [
          {
            name: "Joy Banerjee",
            designation: "VP, Design",
          },
        ],
      },
      {
        id: "t12",
        startTime: "15:00",
        endTime: "15:20",
        title: "AI and the Future for Product Managers",
        speakers: [
          {
            name: "Nitya Sagar",
          },
        ],
      },
      {
        id: "t13",
        startTime: "15:25",
        endTime: "16:00",
        title: "Group Discussion",
        speakers: [
          {
            name: "Jatinn Garg",
          },
          {
            name: "Vishal",
            designation: "Senior Product Manager",
          },
          {
            name: "Tarushi Sharma",
            designation: "Product Manager @ American Express",
          },
          {
            name: "Shruti Tiwari",
            designation: "Sr. Product Marketing Manager",
          },
        ],
      },
      {
        id: "t14",
        startTime: "16:00",
        endTime: "17:00",
        title: "Small Business Fair, Networking & Activities",
      },
      {
        id: "t15",
        startTime: "17:00",
        endTime: "18:00",
        title: "Closing Keynote",
      },
    ],
  },

  {
    id: "build",
    name: "Build",
    color: "#34A853",
    sessions: [
      {
        id: "b1",
        startTime: "09:00",
        endTime: "09:30",
        title: "Registrations",
      },
      {
        id: "b2",
        startTime: "10:00",
        endTime: "10:30",
        title: "Opening Keynote",
      },
      {
        id: "b3",
        startTime: "10:30",
        endTime: "11:00",
        title: "Introduction by Google",
      },
      {
        id: "b4",
        startTime: "11:00",
        endTime: "11:30",
        title: "Building Hybrid AI Mobile Apps Using Gemini and LiteRT",
        speakers: [
          {
            name: "Shivay Lamba",
          },
        ],
      },
      {
        id: "b5",
        startTime: "11:35",
        endTime: "12:00",
        title: "The Product and Engineering Behind Climate Intelligence",
        speakers: [
          {
            name: "Supriya Purohit",
          },
        ],
      },
      {
        id: "b6",
        startTime: "12:00",
        endTime: "12:25",
        title: "CLS, INP & LCP Walk Into a Bar... (And Google Takes Notes)",
        speakers: [
          {
            name: "Aprajita Verma",
            designation: "Frontend Architect",
          },
        ],
      },
      {
        id: "b7",
        startTime: "12:30",
        endTime: "12:50",
        title:
          "Time to Commit and Get Git Gud: GitHub Workflow Upgrades You Need to Know About",
        speakers: [
          {
            name: "Vipul Gupta",
            designation:
              "Senior Software Engineer @ balena",
          },
        ],
      },
      {
        id: "b8",
        startTime: "12:55",
        endTime: "13:20",
        title:
          "LLM-Powered IoT: How Vertex AI & Gemini Understand Live Sensor Data",
        speakers: [
          {
            name: "Avirup Basu",
            designation: "Developer | Speaker | IoT",
          },
        ],
      },
      {
        id: "b9",
        startTime: "13:25",
        endTime: "14:10",
        title: "Lunch",
      },
      {
        id: "b10",
        startTime: "14:10",
        endTime: "14:25",
        title: "Fun Activity",
      },
      {
        id: "b11",
        startTime: "14:30",
        endTime: "14:55",
        title: "Designing Future-Proof Finance Portfolio",
        speakers: [
          {
            name: "Saurabh Rajpal",
            designation: "Staff Web Ecosystem Consultant, Google",
          },
        ],
      },
      {
        id: "b12",
        startTime: "15:00",
        endTime: "15:20",
        title: "How Open Source Made Me a Generalist & Why That's a Good Thing",
        speakers: [
          {
            name: "Utkarsh Gupta",
          },
        ],
      },
      {
        id: "b13",
        startTime: "15:25",
        endTime: "15:45",
        title: "Behind the Scenes of Safer AI...",
        speakers: [
          {
            name: "Anupam Singh",
          },
        ],
      },
      {
        id: "b14",
        startTime: "16:10",
        endTime: "17:00",
        title: "Small Business Fair, Networking & Activities",
      },
      {
        id: "b15",
        startTime: "17:00",
        endTime: "18:00",
        title: "Closing Keynote",
      },
    ],
  },
    {
    id: "grow",
    name: "Grow",
    color: "#FBBC04",
    sessions: [
      {
        id: "g1",
        startTime: "09:00",
        endTime: "09:30",
        title: "Registrations",
      },
      {
        id: "g2",
        startTime: "10:00",
        endTime: "10:30",
        title: "Opening Keynote",
      },
      {
        id: "g3",
        startTime: "10:30",
        endTime: "11:00",
        title: "Introduction by Google",
      },
      {
        id: "g4",
        startTime: "11:00",
        endTime: "11:20",
        title: "Responsible AI - Ethics and Governance",
        speakers: [
          {
            name: "Saakshar Duggal",
          },
        ],
      },
      {
        id: "g5",
        startTime: "11:25",
        endTime: "11:50",
        title: "Don't Just Find, Solve: Building Agentic Search",
        speakers: [
          {
            name: "Puranjay Rohan Gulati",
            designation: "Lead AI Architect @ FutureSoft",
          },
        ],
      },
      {
        id: "g6",
        startTime: "11:55",
        endTime: "12:15",
        title: "Making AI Agents Go Brrrrr with Audio AI",
        speakers: [
          {
            name: "Harsh",
            designation: "Making ML Infra Systems Fun and Easy",
          },
        ],
      },
      {
        id: "g7",
        startTime: "12:20",
        endTime: "12:40",
        title: "Semantic Search: Add a Brain to Your Search Bar",
        speakers: [
          {
            name: "Akshat Sharma",
            designation: "ML/AI Innovator and Enthusiast",
          },
        ],
      },
      {
        id: "g8",
        startTime: "12:45",
        endTime: "13:05",
        title:
          "Don't Build a House Without a Lock: Security Steps for Developers",
        speakers: [
          {
            name: "Nikita Purwar",
            designation: "Lead Consultant at Thoughtworks",
          },
        ],
      },
      {
        id: "g9",
        startTime: "13:10",
        endTime: "13:40",
        title: "Lunch",
      },
      {
        id: "g10",
        startTime: "13:45",
        endTime: "14:15",
        title: "Fun Activity",
      },
      {
        id: "g11",
        startTime: "14:20",
        endTime: "14:45",
        title: "Designing a Future-Proof Finance Portfolio",
        speakers: [
          {
            name: "Shivani Gera",
          },
        ],
      },
      {
        id: "g12",
        startTime: "14:45",
        endTime: "15:05",
        title: "Hidden Cost of AI: Sustainability and Cognition",
        speakers: [
          {
            name: "Shubhangi Gupta",
          },
        ],
      },
      {
        id: "g13",
        startTime: "15:10",
        endTime: "15:30",
        title:
          "Behind the Scenes of Safer AI: Red-Teaming, Moderation & Breaking Models Before They Break Us",
        speakers: [
          {
            name: "Abhigya Verma",
            designation: "Developer, Building LLMs at ServiceNow",
          },
        ],
      },
      {
        id: "g14",
        startTime: "15:35",
        endTime: "16:00",
        title: "Gemini and Synthetics: AI for Next-Gen Monitoring",
        speakers: [
          {
            name: "Siddhi Khaire",
          },
        ],
      },
      {
        id: "g15",
        startTime: "16:00",
        endTime: "17:00",
        title: "Small Business Fair, Networking & Activities",
      },
      {
        id: "g16",
        startTime: "17:00",
        endTime: "18:00",
        title: "Closing Keynote",
      },
    ],
  },

  {
    id: "workshop",
    name: "Workshop",
    color: "#EA4335",
    sessions: [
      {
        id: "w1",
        startTime: "09:00",
        endTime: "09:30",
        title: "Registrations",
      },
      {
        id: "w2",
        startTime: "10:00",
        endTime: "10:30",
        title: "Opening Keynote",
      },
      {
        id: "w3",
        startTime: "10:30",
        endTime: "11:00",
        title: "Introduction by Google",
      },
      {
        id: "w4",
        startTime: "11:00",
        endTime: "11:50",
        title: "Code the Cognitive Web: Google AI's Toolkit",
        speakers: [
          {
            name: "Ashish Kumar",
          },
        ],
      },
      {
        id: "w5",
        startTime: "11:55",
        endTime: "12:40",
        title:
          "Open Source for Everyone: A Practical Hands-on Contribution Workshop",
        speakers: [
          {
            name: "Pushplata Ranjan",
          },
        ],
      },
      {
        id: "w6",
        startTime: "12:45",
        endTime: "13:40",
        title: "Lunch",
      },
      {
        id: "w7",
        startTime: "13:45",
        endTime: "14:00",
        title: "Fun Activity",
      },
      {
        id: "w8",
        startTime: "14:00",
        endTime: "14:50",
        title: "Vibe Coding 101 for Beginners",
        speakers: [
          {
            name: "Aditya Mishra",
          },
        ],
      },
      {
        id: "w9",
        startTime: "14:55",
        endTime: "15:40",
        title: "Build Your Own Pair Programmer in Antigravity",
        speakers: [
          {
            name: "Shekhar Patel",
          },
        ],
      },
      {
        id: "w10",
        startTime: "16:00",
        endTime: "17:00",
        title: "Small Business Fair, Networking & Activities",
      },
      {
        id: "w11",
        startTime: "17:00",
        endTime: "18:00",
        title: "Closing Keynote",
      },
    ],
  },

  {
    id: "speaker-corner",
    name: "Speaker Corner",
    color: "#A142F4",
    sessions: [
      {
        id: "sc1",
        startTime: "11:00",
        endTime: "11:30",
        title: "Group 1",
        speakers: [
          {
            name: "Vipul Gupta",
            designation: "Senior Product Engineer",
          },
          {
            name: "Nikita Purwar",
            designation: "Lead Consultant at Thoughtworks",
          },
          {
            name: "Aditya Mishra",
          },
          {
            name: "Aashish Pahwa",
            designation: "Founder - koso.ai",
          },
        ],
      },
      {
        id: "sc2",
        startTime: "11:30",
        endTime: "12:00",
        title: "Group 2",
        speakers: [
          {
            name: "Mamta Kumari",
          },
          {
            name: "Siddhi Khaire",
            designation: "GDG Pune Volunteer",
          },
          {
            name: "Vishal",
            designation: "Senior Product Manager",
          },
        ],
      },
      {
        id: "sc3",
        startTime: "12:00",
        endTime: "12:30",
        title: "Group 3",
        speakers: [
          {
            name: "Shruti Tiwari",
            designation: "Sr. Product Marketing Manager",
          },
          {
            name: "Avirup Basu",
            designation: "Developer | Speaker | IoT",
          },
          {
            name: "Saakshar Duggal",
            designation: "AI Governance and Law Expert",
          },
          {
            name: "Tarushi Sharma",
            designation: "Product Manager @ American Express",
          },
        ],
      },
      {
        id: "sc4",
        startTime: "12:30",
        endTime: "13:00",
        title: "Group 4",
        speakers: [
          {
            name: "Jatinn Garg",
          },
          {
            name: "Supriya Purohit",
          },
          {
            name: "Puranjay Rohan Gulati",
            designation: "Lead AI Architect @ FutureSoft",
          },
          {
            name: "Anupam Singh",
            designation:
              "Mobile App Development",
          },
        ],
      },
      {
        id: "sc5",
        startTime: "13:00",
        endTime: "14:30",
        title: "Lunch & Networking",
      },
      {
        id: "sc6",
        startTime: "14:30",
        endTime: "15:00",
        title: "Group 5",
        speakers: [
          {
            name: "Nitya Sagar",
          },
          {
            name: "Abhigya Verma",
            designation: "Developer",
          },
          {
            name: "Pushplata Ranjan",
            designation: "Senior Lead Engineer",
          },
          {
            name: "Shivay Lamba",
            designation: "GSoC Mentor at TensorFlow",
          },
        ],
      },
      {
        id: "sc7",
        startTime: "15:00",
        endTime: "15:30",
        title: "Group 6",
        speakers: [
          {
            name: "Paromita Saha",
          },
          {
            name: "Aprajita Verma",
            designation: "Frontend Architect",
          },
          {
            name: "Ashish Kumar Verma",
            designation:
              "Google Developer Expert",
          },
          {
            name: "Harsh",
            designation: "ML Infra Systems",
          },
        ],
      },
      {
        id: "sc8",
        startTime: "15:30",
        endTime: "16:00",
        title: "Group 7",
        speakers: [
          {
            name: "Akshata Malhotra",
          },
          {
            name: "Shivani Gera",
          },
          {
            name: "Sujit Kumar Pradhan",
            designation: "UX Designer",
          },
        ],
      },
    ],
  },
];