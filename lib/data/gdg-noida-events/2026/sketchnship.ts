import type { EventsCatalog } from "../events-data/types";

export const sns: EventsCatalog["sns"] = {
  "2026": {
    seriesId: "sns",
    year: 2026,
    title: 'Sketch "n" Ship with AI',
    subtitle:
      "A 12-hour buildathon where designers, developers, and innovators come together to transform ideas into AI-powered products.",
    status: "completed",
    dates: {
      displayDate: "July 25, 2026",
      isoDate: "2026-07-25",
    },
    startTime: "08:00 AM IST",
    endTime: "08:00 PM IST",
    venue: {
      name: "IIIT Delhi",
      city: "Delhi",
      address: "Okhla Industrial Estate, Phase III (Near Govind Puri Metro Station), New Delhi",
      mapLink: "https://maps.app.goo.gl/EJ7WsW9usmvhdeeAA",
    },
    branding: {
      logo: "",
      coverImage: "https://json.commudle.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNXMxQnc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--006c8c59f1b96b261fbbfedcd19432b89e5cad3e/com_b269cd44d1a365f6_20260630175424.jpeg",
    },
    overview: {
      heading: "Event overview",
      stats: [
        { label: "Prize Pool", value: "₹22,500" },
        { label: "Winners", value: "3" },
        { label: "Tracks", value: "6" },
        { label: "Registered", value: "692+" },
      ],
    },
    about: {
      heading: "About this event",
      description:
        'Sketch "n" Ship with AI is a 12-hour buildathon where designers, developers, and innovators come together to transform ideas into AI-powered products.\n\nFrom crafting intuitive user experiences to building intelligent applications, participants will leverage the latest AI tools and technologies to accelerate the journey from concept to deployment. Whether you\'re designing interfaces in Figma, engineering scalable systems, integrating LLMs, or experimenting with AI agents, this hackathon provides the perfect environment to create, collaborate, and ship.\n\nThe journey begins online with a qualifying round, where participants submit innovative solution ideas around announced tracks. The most promising teams will be shortlisted and invited to the offline buildathon, where brand-new problem statements will be revealed on the day of the event, ensuring a level playing field for every finalist.\n\nThroughout the offline event, teams will tackle real-world challenges, receive mentorship from industry experts, and compete to build impactful AI-powered solutions within 12 hours. It\'s a day dedicated to rapid prototyping, collaboration, and turning ambitious ideas into working products.\n\nWhether you\'re a designer, developer, product thinker, or AI enthusiast, Sketch "n" Ship with AI is your opportunity to learn, build, and showcase what you can create with modern AI technologies.',
    },
    uniqueStats: {
      speakers: 1,
      attendees: "100+",
      registered: "692+",
    },
    speakers: {
      heading: "Speakers & Mentors",
      list: [
        {
          name: "Omna Gupta",
          designation: "Speaker",
          company: "Notion",
        },
      ],
    },
    agenda: {
      heading: "Agenda",
      tracks: [
        {
          id: "main-track",
          name: "Main Track",
          color: "#4285F4",
          sessions: [
            {
              id: 1,
              startTime: "08:30 AM",
              endTime: "09:30 AM",
              title: "Registration",
              description:
                "Finalist check-in. Make sure to carry your Entry Pass and a valid Photo ID (College ID/Aadhaar Card).",
              speakers: [],
            },
            {
              id: 2,
              startTime: "09:30 AM",
              endTime: "10:00 AM",
              title: "Networking & Snacks",
              description: "Connect with fellow builders and grab some morning snacks.",
              speakers: [],
            },
            {
              id: 3,
              startTime: "10:00 AM",
              endTime: "10:15 AM",
              title: "Opening Keynote",
              description: "Welcome address and hackathon kickoff.",
              speakers: [],
            },
            {
              id: 4,
              startTime: "10:15 AM",
              endTime: "11:30 AM",
              title: "Hackathon Begins",
              description: "Problem statements revealed and hacking officially commences!",
              speakers: [],
            },
            {
              id: 5,
              startTime: "11:30 AM",
              endTime: "12:00 PM",
              title: "Intro to Notion by Omna Gupta",
              description: "Introductory session to Notion for builders and innovators.",
              speakers: [
                {
                  name: "Omna Gupta",
                  designation: "Speaker",
                  company: "Notion",
                },
              ],
            },
            {
              id: 6,
              startTime: "12:00 PM",
              endTime: "01:00 PM",
              title: "Mentorship Round",
              description: "1-on-1 mentorship and technical guidance from industry experts.",
              speakers: [],
            },
            {
              id: 7,
              startTime: "01:00 PM",
              endTime: "02:45 PM",
              title: "Lunch & Hacking",
              description: "Refuel and continue building your AI solution.",
              speakers: [],
            },
            {
              id: 8,
              startTime: "02:45 PM",
              endTime: "03:00 PM",
              title: "Submission Deadline",
              description: "Final deadline for submitting code, demos, and presentations.",
              speakers: [],
            },
            {
              id: 9,
              startTime: "03:00 PM",
              endTime: "04:30 PM",
              title: "Round 1 Judging",
              description: "Initial evaluation round by the judging panel.",
              speakers: [],
            },
            {
              id: 10,
              startTime: "04:30 PM",
              endTime: "05:00 PM",
              title: "Evening Snacks",
              description: "Refreshments break before the final judging round.",
              speakers: [],
            },
            {
              id: 11,
              startTime: "05:00 PM",
              endTime: "06:00 PM",
              title: "Final Round Judging (Top Teams)",
              description: "Top finalist teams present their pitch and prototype to the judging panel.",
              speakers: [],
            },
            {
              id: 12,
              startTime: "06:00 PM",
              endTime: "07:00 PM",
              title: "Results & Closing Ceremony",
              description: "Announcement of winners and closing ceremony.",
              speakers: [],
            },
          ],
        },
      ],
    },
    prizes: {
      heading: "Prizes",
      totalPool: "₹ 22,500",
      winnersCount: 3,
      tracksCount: 6,
    },
    rounds: [
      {
        roundNumber: 1,
        title: "Innovation Qualifiers",
        startDate: "04 Jul 2026",
        endDate: "22 Jul 2026",
        mode: "Online",
        description:
          "The journey begins online with a qualifying round, where participants submit innovative solution ideas around announced tracks. The most promising teams are shortlisted and invited to the offline buildathon.",
      },
      {
        roundNumber: 2,
        title: "Offline Hackathon",
        startDate: "25 Jul 2026",
        endDate: "25 Jul 2026",
        mode: "Offline",
        description:
          "12-hour buildathon where brand-new problem statements will be revealed on the day of the event, ensuring a level playing field for every finalist.",
      },
    ],
    sponsors: [
      { name: "GitHub", role: "Partner" },
      { name: "Neo4j", role: "Partner" },
      { name: "Notion", role: "Partner" },
      { name: "Google for Developers", role: "Partner" },
    ],
    faqs: [
      {
        question: "What is the Innovation Round?",
        answer:
          "The journey begins online with a qualifying round, where participants submit innovative solution ideas around announced tracks. The most promising teams are shortlisted and invited to the offline buildathon.",
      },
      {
        question: "Do I need a team to participate?",
        answer:
          "Yes, designers, developers, and innovators can collaborate in teams to build and ship AI-powered products.",
      },
      {
        question: "Can I start early?",
        answer:
          "No, brand-new problem statements will be revealed on the day of the event, ensuring a level playing field for every finalist.",
      },
      {
        question: "Who owns the projects built during the hackathon?",
        answer:
          "The teams retain full ownership of the intellectual property and projects they create during the hackathon.",
      },
      {
        question: "What should I bring?",
        answer:
          "Please make sure to carry your Entry Pass and a valid Photo ID (College ID/Aadhaar Card), along with your laptop and chargers.",
      },
      {
        question: "How much does it cost?",
        answer: "Participation is completely free.",
      },
      {
        question: "Who can participate?",
        answer:
          "Whether you're a designer, developer, product thinker, or AI enthusiast, anyone passionate about learning, building, and showcasing what you can create with modern AI technologies can participate.",
      },
    ],
    team: [
      {
        name: "Abhinav",
        role: "Organizer",
        linkedin: "https://www.linkedin.com/in/abhijha301/",
      },
      {
        name: "Nishant",
        role: "Organizer",
        linkedin: "https://www.linkedin.com/in/curlyparadox/",
      },
      {
        name: "Krish",
        role: "Organizer",
        linkedin: "https://www.linkedin.com/in/krishkhattar/",
      },
      {
        name: "Sai",
        role: "Organizer",
        linkedin: "https://www.linkedin.com/in/saiaryangoswami/",
      },
    ],
    updates: [
      {
        title: "Sketch n Ship with AI Finale – Event Agenda",
        date: "7:13 PM · Fri, 24th Jul 2026",
        content:
          "The wait is almost over! Here's what the day looks like for all our finalists:\n08:30 AM – Registration\n09:30 AM – Networking & Snacks\n10:00 AM – Opening Keynote\n10:15 AM – Hackathon Begins\n11:30 AM – Intro to Notion by Omna Gupta\n12:00 PM – Mentorship Round\n01:00 PM – Lunch\n02:45 PM – Submission Deadline\n03:00 PM – Round 1 Judging\n04:30 PM – Evening Snacks\n05:00 PM – Final Round Judging (Top Teams)\n06:00 PM – Results & Closing Ceremony\n\nVenue details and Entry Pass have already been shared via email. Please make sure to carry your Entry Pass and a valid Photo ID (College ID/Aadhaar Card).\nSee you at the finale!",
      },
    ],
    feedback: {
      heading: "What attendees said",
      reviews: [],
    },
    gallery: {
      heading: "Moments from the event",
      categories: [
        {
          id: "all",
          label: "All",
        },
      ],
      images: [
        { id: 1, src: "/Images/2026/sns/sns/1.JPG", alt: "Sketch n Ship with AI 1", category: "all", aspectRatio: 1 },
        { id: 2, src: "/Images/2026/sns/sns/2.JPG", alt: "Sketch n Ship with AI 2", category: "all", aspectRatio: 1 },
        { id: 3, src: "/Images/2026/sns/sns/3.JPG", alt: "Sketch n Ship with AI 3", category: "all", aspectRatio: 1 },
        { id: 4, src: "/Images/2026/sns/sns/4.JPG", alt: "Sketch n Ship with AI 4", category: "all", aspectRatio: 1 },
        { id: 5, src: "/Images/2026/sns/sns/5.JPG", alt: "Sketch n Ship with AI 5", category: "all", aspectRatio: 1 },
        { id: 6, src: "/Images/2026/sns/sns/6.JPG", alt: "Sketch n Ship with AI 6", category: "all", aspectRatio: 1 },
        { id: 7, src: "/Images/2026/sns/sns/7.JPG", alt: "Sketch n Ship with AI 7", category: "all", aspectRatio: 1 },
        { id: 8, src: "/Images/2026/sns/sns/8.JPG", alt: "Sketch n Ship with AI 8", category: "all", aspectRatio: 1 },
      ],
    },
    links: {
      community: "https://www.commudle.com/communities/gdg-noida",
      event: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship",
      tracks: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship/tracks",
      sponsors: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship#sponsors",
      faq: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship#faq",
      judges: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship/judges",
      prizes: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship/prizes",
      winners: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship/winners",
      projects: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship/projects",
      updates: "https://www.commudle.com/communities/gdg-noida/hackathons/sketch-n-ship#updates",
    },
  },
};

export const sketchNShip = sns;
export const sketchnship = sns;

export default sns;
