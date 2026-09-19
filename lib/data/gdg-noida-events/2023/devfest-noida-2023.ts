import type { EventsCatalog } from "../events-data/types";
import { tracks as devfestAgendaTracks } from "../../../../components/sections/agenda/data";

export const devfestNoida2023: EventsCatalog["devfest-noida-2023"] = {
  "2023": {
    "seriesId": "devfest-noida-2023",
    "year": 2023,
    "title": "DevFest Noida 2023",
    "subtitle": "",
    "status": "completed",
    "dates": {
      "displayDate": "December 30, 2023",
      "isoDate": "2023-12-30"
    },
    "venue": {
      "name": "Holiday Inn",
      "city": "",
      "address": "District Centre, 13A, Mayur Vihar, New Delhi, Delhi 110091",
      "mapLink": ""
    },
    "branding": {
      "logo": "",
      "coverImage": "https://json.commudle.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMU9JQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--839d74b62fc5bd7b3690fad6a97cb59d1b871b7c/DevFest%20Noida%202023.png"
    },
    "overview": {
      "heading": "Event overview",
      "stats": []
    },
    "about": {
      "heading": "About this event",
      "description": "This community-led event brings together developers, designers, and professionals to learn from each other, discover new ideas, and build meaningful connections in the local tech ecosystem."
    },
    "speakers": {
      "heading": "Featured speakers",
      "list": []
    },
    "attendees": {
      "heading": "Attendees",
      "description": "",
      "total": 35000,
      "distribution": []
    },
    "feedback": {
      "heading": "What attendees said",
      "reviews": []
    },
    "agenda": {
      "heading": "Agenda",
      "tracks": [
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
      ]
    },
    "gallery": {
      "heading": "Moments from the event",
      "categories": [
        {
          "id": "all",
          "label": "All"
        }
      ],
      "images": [
        {
          "id": 1,
          "src": "https://json.commudle.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMU9JQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--839d74b62fc5bd7b3690fad6a97cb59d1b871b7c/DevFest%20Noida%202023.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 2,
          "src": "https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3UzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c793a76a579714d72bf7e51b0fe9d4d13640a460/commudle-logo-full.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 3,
          "src": "https://json.commudle.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNmZLQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d66f9155a4bb4bdf4dfbc9a4cc77613dd7709893/Commudle%20Logo.svg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 4,
          "src": "https://json.commudle.com/icons/dark-mode-sun-icon.svg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 5,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbzhkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ed0b3e638d73483e10a8858050ae95e07a925dad/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/GDG%20Noida%20Light%20Horizontal-Logo.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 6,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeldUQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--056b822e7227894a7ac404ee3dc171468dd7d63c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/IMG_3639-3.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 7,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBK2dTQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--837d1990a90a377781c45c95d2798f3d6150470c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/profile-pic%20(2).png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 8,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBLytyQlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--3190d37ab8556a87b4eb5c6adebbbb6d0a2737f7/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJU2xCSEJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--8aa5cc3a1ba972c02c2a679713c934a44596b1df/DSC02966.JPG",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 9,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBejVGQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b072201b1e4cd2252f65a13fe01149e77d7084c0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJWjJsbUJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--694d4598eade1ede5ef0c7cbe631f108e7b5fb9c/New-file.gif",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 10,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1F1IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--09613a84ef2668d860b2656113438771735d4c72/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/google_4561.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 11,
          "src": "https://json.commudle.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL25pQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--59f8c841f2235ca8f35ad2f3343e7ddaa92c6a2b/Expert%20Blue%20Tick.svg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 12,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTQ3IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9b87b9d60c8964034b47f07e648275ba70fff3bc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/google_8401.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 13,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeHN0QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2b15a23007b2d9c0df5393dc7afe6c7d22eea3cc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 14,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNDYzQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--5dfbe745099b11ac5cb8e20ee2bce4aca74ee288/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/avatar.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 15,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNnVBQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d8f59d655c342643fdeaa199fcc995c8c37516a5/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/graduation_photo.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 16,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNlZEQlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--ee4c3e601cf77514d3d3e078e9c2c9b9506ca171/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/aashima%20gogia%20headshot.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 17,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHh5QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a138d2803df0ae20f44261f8defd8433e205fbd6/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/WCXL4sRz_400x400.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 18,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVM1QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--822ad722f9367c32a9a64b3cc2e80cc33c64152f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/ProfilePic.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 19,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdzZVQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1b2513e67ee51e79649c7a1fbb4fdcb4b6caba22/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/ggeetu.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 20,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bc234ee0ea16dbc668f679ab91dbabb58fc32638/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/1638864206772%20(1).jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 21,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnIyIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e0848443cc51c94cb2804361b17e1da312768aec/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 22,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBK3FjQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--6cea87289cd31e4842f5490d5999d9a9c87daf96/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/New%20DP%202.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 23,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc25UIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e65720da2cd4df27caf888d62db4f6d1a9c8e896/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/image_2022-12-02_231932661.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 24,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOCt2QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--384a87a047466b7aeeddc13e4da96ac79b695307/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/Rohan-photo.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 25,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOTI2QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--870c2fde0abf971d91ed7ef282ba74563f847b1d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/WhatsApp%20Image%202024-01-01%20at%205.51.47%20PM%20(2).jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 26,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMkN3QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d2ed341ee017b4904c46a35972707beba5a9da05/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/WhatsApp%20Image%202023-11-03%20at%201.01.35%20PM.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 27,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2toIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c7310311e81f0ccdeb5d21db760488c6550e7cf/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/google_13.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 28,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFRMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6b9e0c5598da36ff83010f91e62e986ed268b43e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/IMG_9874.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 29,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBejZZQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4b6e1f3b86d523eec470073e77361f8554e4d753/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 30,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeTJ6Qnc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--be2e39696ee8168a3d63e1590618a39110b61062/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/com_0d75438fe6492016_20260821162401.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 31,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeU96QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--eef5a8ea575dc15791310182c8c170456c53b730/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 32,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFdoIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--025c6e534d1f1beb811a3c49d6d66110769c0bee/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/Arushi%20Garg.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 33,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdEd0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f736fb9be67cf6d8954e2f4c44181ad9099b5b90/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/Simran.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 34,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0J6Qmc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--200499d665cbb118ee17a6b6024cdfb08d58ad24/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/3rhoCRpq_400x400.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 35,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMnl6QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fd42920ba7b23b8ddf6bd0ceac7cfd911994edec/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/IMG_20191116_213121%20(2).jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 36,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBemJVQlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f072786db87a3647500e47d612bc2cfebd3d5dd4/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/1000267884.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 37,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOW14QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8b3a7b185c123b08670bac16b6a7cc6598b92472/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/WhatsApp%20Image%202023-12-20%20at%2012.33.14%20PM.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 38,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNFlyQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7c3faabb9be6f3e4ab2a308e27f68fcb64887c0a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 39,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFF4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62360a32dc820f0fb1ab304b81be6b078addbc2f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/google_5331.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 40,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2JPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7bf5ee75a04859eff58a7e06850c94c6c2548c58/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKQUFXa0NRQUU2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e1b8c3103b542b9d7ba47b2862e0d51860fbef22/25231.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 41,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeWF5QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4953aed0ad8d3571740d26f6c0476895d57ddebb/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKQUFXa0NRQUU2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e1b8c3103b542b9d7ba47b2862e0d51860fbef22/Neo4j-logo_color.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 42,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXEzQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b941cf5b92af516728250e6850b9bfb63898db80/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKQUFXa0NRQUU2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e1b8c3103b542b9d7ba47b2862e0d51860fbef22/Logo.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 43,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXkzQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2769ca2162d5707a88f4b8103b2a607df83103d0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFKQUFXa0NRQUU2QzJ4dllXUmxjbnNHT2dsd1lXZGxNQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e1b8c3103b542b9d7ba47b2862e0d51860fbef22/logo.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 44,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOTZNQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0a56a82e634fd194c23e8c4360c7d151444a1653/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVNWcEpUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--3ddca6f6c247c2a968f56480e328f90094ff9d95/IMG_20240724_150834.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 45,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOWhWQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--45809ff56676bcb06130e139b3855f0c60442cb9/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVNWcEpUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--cc9745bc98d3057a1d009e2fc5cce6fc9e479f67/Lucky.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 46,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbG9VIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--550489c5e2398c64cccc6982fe9a5bbd01ec7d30/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVNWcEpUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--3ddca6f6c247c2a968f56480e328f90094ff9d95/Screenshot%202021-04-06%20at%2010.12.09%20PM.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 47,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBam53IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4034c4aa2e29c9a0adc284fa01dd8f35f4ea017b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 48,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeVJ0QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c6ab7fc3ad8c48dec2a5815facc2aadcb4d7f96a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hSeVpYTnBlbVZmZEc5ZmJHbHRhWFJiQjJsRmFVVTZDMnh2WVdSbGNuc0dPZ2x3WVdkbE1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--1f38ba38cbd08e0e52ad1086f1646943350cad48/IMG-20230525-WA0007-01.jpeg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 49,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL3ljQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--459fde341a4d162742920088b6ac96325ec83d71/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/avatar.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 50,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMitwQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bf78e63aabaff17294a32a6063156638a5f2492c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 51,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMW12QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--088a3b54bdb420387e1de84bb2fabcfc02ba319e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 52,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMnl3QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fef9293177f55444b276a3805222e94a6040a4cc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--2435c0338fa7cddd280234f2da44100890e88310/avatar.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 53,
          "src": "https://json.commudle.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0d6QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--29202e09f5dc41388bfdefbd1b2af44921dd8e5d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVVWcFJUb0xiRzloWkdWeWV3WTZDWEJoWjJVdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d98d8d7f00147e4586d1b19b8f18ed1c04902eb8/avatar.jpg",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        },
        {
          "id": 54,
          "src": "https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzYzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ec4a1cbde1227bc84c1fc145325263b3dfb219e4/commudle-logo128.png",
          "alt": "DevFest Noida 2023",
          "category": "all",
          "aspectRatio": 1
        }
      ]
    }
  }
};
