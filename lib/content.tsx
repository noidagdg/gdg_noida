import React from "react";

export interface TestimonialAuthor {
  name: string;
  title: string;
  imgSrc: string;
}

/**
 * Editorial content only. Card colour is assigned by position in the
 * Testimonials section so the palette stays with the design, not the copy.
 */
export interface TestimonialCard {
  content: React.ReactNode;
  author: TestimonialAuthor;
}

export const testimonials: TestimonialCard[] = [
  {
    content: (
      <>
        <p className="mb-4">
          In college, I faced many distractions that could have led me astray. In my second year, joining the GDG Noida community was a turning point.
        </p>
        <p className="mb-4">
          Their events and sessions refocused me on my software development goals.{" "}
          <strong className="font-semibold text-zinc-900">
            Thanks to GDG Noida, I found the direction and inspiration to follow my passion.
          </strong>{" "}
          I&apos;m truly grateful for their support and the positive impact on my career.
        </p>
      </>
    ),
    author: {
      name: "Shekhar Patel",
      title: "Software Engineer, Lambdatest",
      imgSrc: "/Images/shekhar.png",
    },
  },

  {
    content: (
      <p>
        <strong className="font-semibold text-zinc-900">
          GDG Noida introduced me to open-source tech communities.
        </strong>{" "}
        Their guidance helped me advance my career, and I&apos;m grateful for the opportunities GDG Noida provided.
        I&apos;m now excited to share my own experiences as a speaker!
      </p>
    ),
    author: {
      name: "Kaushik Karan Singh",
      title: "Android Developer, Mind Geeks",
      imgSrc: "/Images/kaushik-karan.png",
    },
  },

  {
    content: (
      <p>
        GDG Noida is my happy place. When I joined this community 2 years ago, I had no experience in proper communication.
        The team, especially the organizers, were so helpful and always encouraged me.{" "}
        <strong className="font-semibold text-zinc-900">
          Thanks to GDG Noida, I&apos;ve improved my analytical thinking and task management skills and landed great opportunities.
        </strong>
      </p>
    ),
    author: {
      name: "Abhinav Jha",
      title: "Product Designer Intern, Nickelfox",
      imgSrc: "/Images/abhinav-jha.png",
    },
  },

  {
    content: (
      <p>
        I had the privilege of meeting Ansh Mehra at DevFest Noida. I learned the fundamentals of design from his YouTube videos.
        As a distinguished speaker at the event, he left an indelible mark on me.
        Meeting him at DevFest opened the door to a collaborative journey on a series of exciting projects.{" "}
        <strong className="font-semibold text-zinc-900">
          I am grateful to DevFest Noida for providing me with this opportunity to connect with great designers,
        </strong>{" "}
        which has accelerated my career growth and development.
      </p>
    ),
    author: {
      name: "Garima Pandey",
      title: "UX Designer, Eden Care Medical",
      imgSrc: "/Images/garima-pandey.png",
    },
  },

  {
    content: (
      <p>
        Being part of GDG Noida was transformative for me. It was more than a community; it was where I found my voice and my people.
        GDG Noida was my safe space to share ideas and learn without fear.{" "}
        <strong className="font-semibold text-zinc-900">
          I&apos;ll never forget speaking at the Women&apos;s Day event, #DareToBe.
        </strong>{" "}
        I was terrified, but they believed in me and gave me the courage to step into the spotlight.{" "}
        <strong className="font-semibold text-zinc-900">
          The connections I made built a reliable support system.
        </strong>{" "}
        The conversations, brainstorming, and sense of belonging helped me grow.
      </p>
    ),
    author: {
      name: "Sumati Gupta",
      title: "Project Coordinator",
      imgSrc: "/Images/sumati-gupta.png",
    },
  },

  {
    content: (
      <p>
        Their guidance helped me advance my career, and I&apos;m grateful for the opportunities GDG Noida provided.{" "}
        <strong className="font-semibold text-zinc-900">
          The sessions and hands-on workshops inspired me to contribute to open source, 
        </strong>{" "}
        and collaborations sparked new friendships.{" "}
      </p>
    ),
    author: {
      name: "Parul Gupta",
      title: "Associate Project Manager",
      imgSrc: "/Images/parul-gupta.jpeg",
    },
  },
];

// ─── Gallery Types & Data ───────────────────────────────────────────────────

export type GalleryCategoryId = "all" | "talks" | "workshops" | "networking";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategoryId;
  aspectRatio: number; // width / height
}

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "talks", label: "Talks" },
  { id: "workshops", label: "Workshops" },
  { id: "networking", label: "Networking" },
];
