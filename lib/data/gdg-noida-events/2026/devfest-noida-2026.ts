import type { EventsCatalog } from "../events-data/types";

export const devfestNoida2026: EventsCatalog["devfest-noida-2026"] = {
  "2026": {
    "seriesId": "devfest-noida-2026",
    "year": 2026,
    "title": "DevFest Noida 2026",
    "subtitle": "",
    "status": "upcoming",
    "dates": {
      "displayDate": "October 10, 2026",
      "isoDate": "2026-10-10"
    },
    "venue": {
      "name": "Expo Inn",
      "city": "",
      "address": "25-29, Knowledge Park II, Greater Noida, Noida, Uttar Pradesh 201310",
      "mapLink": "https://maps.app.goo.gl/n7cwEXfT5mFD1zTQ6"
    },
    "branding": {
      "logo": "",
      "coverImage": "https://json.commudle.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdzBDQ0E9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--368c1cb291adb9053232ff667ff3b2c856c0c655/com_5c9299f180a2385a_20260914191226.png"
    },
    "overview": {
      "heading": "Event overview",
      "stats": []
    },
    "about": {
      "heading": "About this event",
      "description": "DevFest is the world’s largest community-led technology conference, hosted annually by Google Developer Groups (GDG) chapters globally.  These decentralized events bring together developers, students, and tech enthusiasts for full-day conferences featuring keynotes, hands-on workshops, codelabs, and networking sessions focused on Google technologies such as Android, Cloud, AI, and Web development."
    },
    "sponsors": [
      { name: "Github", role: "Event Sponsor", url:"https://github.com/" },
      { name: "Solace", role: "Platinum Sponsor", url: "https://solace.com/" },
      { name: "GDG", role: "Event Sponsor", url: "https://gdg.community.dev/" },
      { name: "Robotic Sir", role: "Event Sponsor", image:"/assets/sponsors/robotic_sir.avif",url: "https://roboticsir.com/" },
      { name: "Hyperprobe", role: "Associate Sponsor", image: "https://bookface-images.s3.amazonaws.com/small_logos/b4b91e0b78bbed1c83add57d22b06ab632567450.png", url: "https://www.hyperprobe.co/" }
    ],
    "uniqueStats": {
      "speakers": "--",
      "attendees": "--",
      "registered": "--"
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
          name: "AI Overloaded",
          color: "#4285F4",
          sessions: [
            {
              id: "t1",
              startTime: "09:00",
              endTime: "10:00",
              title: "Registrations",
            },
            {
              id: "t2",
              startTime: "10:00",
              endTime: "11:00",
              title: "Opening Note",
            },
            {
              id: "t3",
              startTime: "11:00",
              endTime: "11:30",
              title: "Building On-Device AI Apps with Flutter & Gemma",
              speakers:[
                {
                  name:"Akansha Jain",
                  designation: "Senior Software Engineer"
                }
              ]
            },
            {
              id: "t4",
              startTime: "11:30",
              endTime: "12:00",
              title: "Underwriting Is a Team Sport: How Solace Agent Mesh Coordinates AI Agents for Lending",
              speakers: [
                {
                  name: "Giri Venkatesan",
                  designation: "Principal Developer Advocate & Architect",
                },
              ],
            },
            {
              id: "t5",
              startTime: "12:00",
              endTime: "12:30",
              title: "Use Google documentation to build effectively with AI",
              speakers: [
                {
                  name: "Meghna Acharjee",
                  designation:"Technical Writer, Google",
                },
                {
                  name:"Jyotsna Talwani",
                  designation:"Google Team"
                }
              ],
            },
            {
              id: "t6",
              startTime: "12:30",
              endTime: "13:00",
              title:"Inside the Making of a Software Factory",
              speakers: [
                {
                  name: "Bhawna Chauhan",
                  designation:"Developer, MLHacks Fellow, LFX-23, GCE"
                },
              ],
            },
            {
              id: "t7",
              startTime: "13:00",
              endTime: "14:00",
              title:
                "LUNCH",
              speakers: [],
            },
            {
              id: "t8",
              startTime: "14:00",
              endTime: "14:20",
              title: "Activity",
            },
            {
              id: "t9",
              startTime: "14:20",
              endTime: "14:40",
              title: "Activation Sensory Transduction - the final frontier in AI Model Safety",
              speakers:[
                {
                  name:"Viraj Sharma",
                  designation:"Developer Enthusiast"
                }
              ],
            },
            {
              id: "t10",
              startTime: "14:40",
              endTime: "15:05",
              title: "Who Owns AI Risk? Building Governance That Actually Works",
              speakers: [
                {
                  name: "Dushyant Singh",
                  designation:"Executive Vice President - Eng & IT"
                },
              ],
            },
            {
              id: "t11",
              startTime: "15:05",
              endTime: "15:30",
              title: "Agentic Web",
              speakers: [
                {
                  name: "Saurabh Rajpal",
                  designation:"Staff Web Ecosystem Consultant, Google"
                },
              ],
            },
            {
              id: "t12",
              startTime: "15:30",
              endTime: "16:00",
              title: "Demo & Community Showcase",
              speakers: [],
            },
            {
              id: "t13",
              startTime: "16:00",
              endTime: "17:00",
              title: "Tea & Networking",
            },
            {
              id:"t14",
              startTime:"17:00",
              endTime:"17:30",
              title:"Closing"
            }
          ],
        },

        {
          id: "build",
          name: "ABC",
          color: "#34A853",
          sessions: [
            {
              id: "b1",
              startTime: "9:00",
              endTime: "10:00",
              title: "Registerations",
              speakers:[]
            },
            {
              id: "b2",
              startTime: "10:00",
              endTime: "11:00",
              title: "Opening Note",
              speakers:[]
            },
            {
              id: "b3",
              startTime: "11:00",
              endTime: "11:30",
              title: "Designing Interfaces That Admit What They Don't Know",
              speakers:[
                {
                  name:"Drishyaa Duggal",
                  designation:"Ai Psychology and Cyberpsychology Evangelist"
                }
              ]
            },
            {
              id: "b4",
              startTime: "11:30",
              endTime: "12:00",
              title: "Pixel to production super-fast",
              speakers:[
                {
                  name:"Tushar Debnath",
                  designation:"Senior Product Designer"
                }
              ]
            },
            {
              id: "b5",
              startTime: "12:00",
              endTime: "12:30",
              title: "Who’s Responsible When AI Goes Rogue?",
              speakers:[
                {
                  name:"Farees Fathima",
                  designation:"Responsible AI Leader"
                }
              ]
            },
            {
              id: "b6",
              startTime: "12:30",
              endTime: "13:00",
              title: "Let Them Run, Not Roam: Securing AI Agents with Sandboxes",
              speakers: [
                {
                  name:"Pratik (CreateOS)",
                  designation:"CTO, co-founder"
                }
              ],
            },
            {
              id: "b7",
              startTime: "13:00",
              endTime: "14:00",
              title: "LUNCH",
              speakers: [
              ],
            },
            {
              id: "b8",
              startTime: "14:00",
              endTime: "14:30",
              title: "ACTIVITY",
              speakers: [
              ],
            },
            {
              id: "b9",
              startTime: "14:30",
              endTime: "14:50",
              title:
                "AI Can Build it. Can people use it?",
              speakers: [
                {
                  name: "Manish Ahluwalia",
                  designation:"Design Leadership"
                },
              ],
            },
            {
              id: "b10",
              startTime: "14:50",
              endTime: "15:10",
              title:
                "Thinking Before Prompting: How to Work Better With AI",
              speakers: [
                {
                  name: "Rohit Soni",
                  designation:"Founder & Doodler"
                },
              ],
            },
            {
              id: "b11",
              startTime: "15:10",
              endTime: "15:25",
              title:
                "Your Side Project Deserves an Ending: Coding was never the hard part.",
              speakers: [
                {
                  name: "Garima Pandey",
                  designation:"UI/UX Designer"
                },
              ],
            },
            {
              id: "b12",
              startTime: "15:25",
              endTime: "16:00",
              title:
                "Fireside Chat",
              speakers: [
                {
                  name: "Ashutosh Parihar",
                  designation:"Vice President & Head of Design - Ixigo"
                },
              ],
            },
            {
              id: "b13",
              startTime: "16:00",
              endTime: "17:00",
              title:
                "Tea & Networking",
              speakers: [],
            },
            {
              id: "b14",
              startTime: "17:00",
              endTime: "17:30",
              title: "Closing",
              speakers:[]
            },
          ],
        },
          {
          id: "grow",
          name: "AI x Hardware (Deep Tech)",
          color: "#FBBC04",
          sessions: [
            {
              id: "g1",
              startTime: "9:00",
              endTime: "10:00",
              title: "Registerations",
              speakers:[]
            },
            {
              id: "g2",
              startTime: "10:00",
              endTime: "11:00",
              title: "Opening Note",
              speakers:[]
            },
            {
              id: "g3",
              startTime: "11:00",
              endTime: "11:30",
              title: "Teaching a Tiny Chip to Think",
              speakers:[
                {
                  name:"Aditya Paribrajak"
                },
                {
                  name:"Ravi Paribrajak"
                }
              ]
            },
            {
              id: "g4",
              startTime: "11:30",
              endTime: "12:00",
              title: "AI is like a Girlfriend which Ghosts in the Context Window",
              speakers:[
                {
                  name:"Ashish Kumar Verma",
                  designation:"Google Developer Expert"
                }
              ]
            },
            {
              id: "g5",
              startTime: "12:00",
              endTime: "12:30",
              title: "Brains, Chips, & the people in between",
              speakers:[
                {
                  name:"Shubhangi Gupta",
                  designation:"Organiser @GDG Noida"
                }
              ]
            },
            {
              id: "g6",
              startTime: "12:30",
              endTime: "13:00",
              title: "Reading the Body's Signals: A Developer's Guide to Prosthetic Control",
              speakers: [],
            },
            {
              id: "g7",
              startTime: "13:00",
              endTime: "14:00",
              title: "LUNCH",
              speakers: [
              ],
            },
            {
              id: "g8",
              startTime: "14:00",
              endTime: "14:30",
              title: "ACTIVITY",
              speakers: [],
            },
            {
              id: "g9",
              startTime: "14:30",
              endTime: "15:00",
              title: "Don’t Debug in Production: Simulate, Validate & Deploy Robots Safely",
              speakers: [
                {
                  name:"Rohit Kumar",
                  designation:"Software Developer"
                }
              ],
            },
            {
              id: "g10",
              startTime: "15:00",
              endTime: "15:30",
              title:
                "Don't Stream Tokens Into A Servo",
              speakers: [
                {
                  name:"Kunal Kumar Sahoo",
                  designation:"Student, Researcher, Developer"
                }
              ],
            },
            {
              id: "g11",
              startTime: "15:30",
              endTime: "16:00",
              title: "Lead to Future",
              speakers:[
                {
                  name:"Piyush Bafna Jain",
                  designation:"Robotics, Semiconductor and International Networking"
                }
              ]
            },
            {
              id: "g12",
              startTime: "16:00",
              endTime: "17:00",
              title: "Tea & Networking",
              speakers:[]
            },
            {
              id: "g11",
              startTime: "17:00",
              endTime: "17:30",
              title: "Closing",
              speakers:[]
            },
          ],
        },

        {
          id: "workshop",
          name: "Workshop Track",
          color: "#EA4335",
          sessions: [
            {
              id: "w1",
              startTime: "9:00",
              endTime: "10:00",
              title: "Registerations",
              speakers:[]
            },
            {
              id: "w2",
              startTime: "10:00",
              endTime: "11:00",
              title: "Opening Note",
              speakers:[]
            },
            {
              id: "w3",
              startTime: "11:00",
              endTime: "12:15",
              title: "Welcome to the AI Playground",
              speakers:[
                {
                  name:"Neelesh Chaudhary"
                }
              ]
            },
            {
              id: "w4",
              startTime: "12:15",
              endTime: "13:00",
              title: "Beyond Chatbots: Building Intelligent Apps with Gemini AI",
              speakers:[
                {
                  name:"Anand Gaur",
                  designation:"Mobile Tech Lead"

                }
              ]
            },
            {
              id: "w5",
              startTime: "13:00",
              endTime: "14:00",
              title: "LUNCH",
            },
            {
              id: "w6",
              startTime: "14:00",
              endTime: "14:30",
              title: "ACTIVITY",
              speakers: [
              ],
            },
            {
              id: "w7",
              startTime: "14:30",
              endTime: "16:00",
              title:"Build a Multi-Agent Travel Planner: Hands-On with Solace Agent Mesh",
              speakers: [
                {
                  name: "Giri Venkatesan",
                  designation:"Principle Developer Advocate & Architect"
                },
                {
                  name:"Himanshu Gupta"
                }
              ],
            },
            {
              id: "w8",
              startTime: "16:00",
              endTime: "17:00",
              title: "Tea & Networking",
            },{
              id: "w9",
              startTime: "17:00",
              endTime: "17:30",
              title: "Closing",
              speakers: [],
            },
          ]
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
      "images": []
    }
  }
};
