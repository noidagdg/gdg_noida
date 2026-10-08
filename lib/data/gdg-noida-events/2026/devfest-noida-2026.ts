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
      { name: "Hyperprobe", role: "Associate Sponsor", image: "https://bookface-images.s3.amazonaws.com/small_logos/b4b91e0b78bbed1c83add57d22b06ab632567450.png", url: "" }
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
              title: "Talk 1 - Web",
              speakers:[
                {
                  name:"Akansha Jain",
                }
              ]
            },
            {
              id: "t4",
              startTime: "11:30",
              endTime: "12:00",
              title: "Talk 2 - Solace/Enterprise",
              speakers: [
                {
                  name: "Giri Venkatesan",
                },
              ],
            },
            {
              id: "t5",
              startTime: "12:00",
              endTime: "12:30",
              title: "Talk 3 - Cloud",
              speakers: [
                {
                  name: "Meghna Acharjee",
                  designation:"Google Team"
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
              title:"Talk 4 - Mobile",
              speakers: [
                {
                  name: "Shubhangi",
                },
              ],
            },
            {
              id: "t7",
              startTime: "13:00",
              endTime: "13:45",
              title:
                "Lunch",
              speakers: [],
            },
            {
              id: "t8",
              startTime: "13:45",
              endTime: "14:00",
              title: "Back to Track",
              speakers: [
              ],
            },
            {
              id: "t9",
              startTime: "14:00",
              endTime: "14:20",
              title: "Activity",
            },
            {
              id: "t10",
              startTime: "14:20",
              endTime: "14:40",
              title: "Talk 5 - AI Models",
              speakers:[
                {
                  "name":"Viraj Sharma"
                }
              ],
            },
            {
              id: "t11",
              startTime: "14:40",
              endTime: "15:00",
              title: "AI Governance/Enterprise",
              speakers: [
                {
                  name: "Dushyant Singh",
                },
              ],
            },
            {
              id: "t12",
              startTime: "15:05",
              endTime: "15:30",
              title: "Talk 7",
              speakers: [
                {
                  name: "Bhawna Chauhan",
                },
              ],
            },
            {
              id: "t13",
              startTime: "15:30",
              endTime: "15:50",
              title: "Talk 8 - Andriod/Flutter",
              speakers: [
                {
                  name: "Saurabh Rajpal",
                },
              ],
            },
            {
              id: "t14",
              startTime: "15:50",
              endTime: "16:00",
              title: "Activity",
            },
            {
              id: "t15",
              startTime: "16:00",
              endTime: "17:00",
              title: "Tea & Networking",
            },
            {
              id:"t16",
              startTime:"17:00",
              endTime:"18:00",
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
              startTime: "11:00",
              endTime: "11:30",
              title: "Talk 1",
              speakers:[
                {
                  name:""
                }
              ]
            },
            {
              id: "b2",
              startTime: "11:00",
              endTime: "12:00",
              title: "Talk 2",
              speakers:[
                {
                  name:"Kavisha"
                }
              ]
            },
            {
              id: "b3",
              startTime: "12:00",
              endTime: "12:30",
              title: "Talk 3 - Responsible AI",
              speakers:[
                {
                  "name":"Farees Fathima"
                }
              ]
            },
            {
              id: "b4",
              startTime: "12:00",
              endTime: "12:30",
              title: "CreateOS",
              speakers: [
              ],
            },
            {
              id: "b5",
              startTime: "12:30",
              endTime: "14:00",
              title: "Break",
              speakers: [
              ],
            },
            {
              id: "b6",
              startTime: "14:00",
              endTime: "14:30",
              title: "Activity",
              speakers: [
              ],
            },
            {
              id: "b7",
              startTime: "14:30",
              endTime: "14:50",
              title:
                "Talk 5 - AI Can Build it. Can people use it?",
              speakers: [
                {
                  name: "Manish Ahluwalia",
                },
              ],
            },
            {
              id: "b8",
              startTime: "14:50",
              endTime: "15:35",
              title:
                "Talk 6 - Fireside chat with Ashutosh",
              speakers: [
                {
                  name: "Ashutosh Kumar",
                },
              ],
            },
            {
              id: "b9",
              startTime: "15:35",
              endTime: "17:00",
              title: "Talk 4 - UX",
              speakers:[
                {
                  name:"Drishyaa Duggal"
                }
              ]
            },
          ],
        },
          {
          id: "grow",
          name: "AI x Hardware",
          color: "#FBBC04",
          sessions: [
            {
              id: "g1",
              startTime: "11:00",
              endTime: "11:30",
              title: "Talk 1 - Aditya Invent",
              speakers:[
                {
                  "name":"Aditya"
                }
              ]
            },
            {
              id: "g2",
              startTime: "11:30",
              endTime: "12:00",
              title: "Talk 2",
              speakers:[
                {
                  "name":"Ashish Verma"
                }
              ]
            },
            {
              id: "g3",
              startTime: "12:00",
              endTime: "12:30",
              title: "Talk 3 - WFS",
              speakers:[
                {
                  "name":"Shubhangi Gupta"
                }
              ]
            },
            {
              id: "g4",
              startTime: "12:30",
              endTime: "13:00",
              title: "Talk 4",
              speakers: [
                {
                  name: "Damini",
                },
              ],
            },
            {
              id: "g5",
              startTime: "14:00",
              endTime: "14:30",
              title: "Activity",
              speakers: [
              ],
            },
            {
              id: "g6",
              startTime: "14:30",
              endTime: "14:50",
              title: "Talk 5",
              speakers: [
                {
                  name: "Kunal Kumar Sahoo",
                },
              ],
            },
            {
              id: "g7",
              startTime: "14:50",
              endTime: "15:10",
              title: "Talk 6 - Orangewoods(YC)",
              speakers: [
              ],
            },
            {
              id: "g8",
              startTime: "15:10",
              endTime: "15:30",
              title:
                "Activity",
              speakers: [
              ],
            },
            {
              id: "g9",
              startTime: "15:30",
              endTime: "16:00",
              title: "Talk - Robotics Track",
              speakers:[
                {
                  "name":"Nishant"
                }
              ]
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
              startTime: "11:00",
              endTime: "12:15",
              title: "Workshop 1",
              speakers:[
                {
                  "name":"Neelesh Chaudhary"
                }
              ]
            },
            {
              id: "w2",
              startTime: "12:15",
              endTime: "13:00",
              title: "Workshop 2 - Fun experiments with AI",
              speakers:[
                {
                  "name":"Anand Gaur"
                }
              ]
            },
            {
              id: "w3",
              startTime: "13:00",
              endTime: "13:45",
              title: "Lunch",
            },
            {
              id: "w4",
              startTime: "13:45",
              endTime: "14:00",
              title: "Back to track",
              speakers: [
              ],
            },
            {
              id: "w5",
              startTime: "14:00",
              endTime: "15:15",
              title:
                "Workshop 3 - Solace",
              speakers: [
                {
                  name: "Giri",
                },
              ],
            },
            {
              id: "w6",
              startTime: "15:15",
              endTime: "16:00",
              title: "",
            },
            {
              id: "w7",
              startTime: "16:00",
              endTime: "17:00",
              title: "Tea & Networking",
            },
            {
              id: "w8",
              startTime: "17:00",
              endTime: "17:30",
              title: "Closing",
              speakers: [
                
              ],
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
