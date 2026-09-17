export interface CommunityReview {
  id: string | number;
  text: string;
  backgroundColor?: string;
  author?: { name: string; role?: string; companyOrCollege?: string };
}

const fallbackReviews: CommunityReview[] = [
  { id: 1, text: "Thanks to GDG Noida, I found the direction and inspiration to follow my passion.", backgroundColor: "#FFF2CC" },
  { id: 2, text: "Thanks to GDG Noida, I've improved my analytical thinking and task management skills and landed great opportunities.", backgroundColor: "#FFE4E4" },
  { id: 3, text: "I am grateful to DevFest Noida for providing me with this opportunity to connect with great designers.", backgroundColor: "#E1F5E8" },
  { id: 4, text: "I'll never forget speaking at the Women's Day event and hearing so many inspiring stories. #DareToBe.", backgroundColor: "#E5EEFC" },
  { id: 5, text: "GDG Noida introduced me to open-source tech communities.", backgroundColor: "#FFF2CC" },
];

export default function CommunityFeedback({ heading = "Community feedback", reviews = fallbackReviews }: { heading?: string; reviews?: CommunityReview[] }) {
  if (reviews.length === 0) return null;

  const feedbackColumns = [reviews.filter((_, index) => index % 3 === 0), reviews.filter((_, index) => index % 3 === 1), reviews.filter((_, index) => index % 3 === 2)];
  return (
    <section className="w-full bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <h2 className="mb-12 text-center text-4xl font-normal tracking-tight text-black md:text-5xl lg:text-6xl">
          {heading}
        </h2>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {feedbackColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-5">
              {column.map((feedback, feedbackIndex) => (
                <div
                  key={feedbackIndex}
                  className={`rounded-2xl px-6 py-7 ${
                    columnIndex === 2 && feedbackIndex === 1
                      ? "md:mt-auto"
                      : ""
                  }`}
                  style={{
                    backgroundColor: feedback.backgroundColor ?? "#E5EEFC",
                  }}
                >
                  <p className="text-base leading-relaxed text-black">
                    {feedback.text}
                    {feedback.author && <p className="mt-4 text-sm font-medium">{feedback.author.name}{feedback.author.role ? `, ${feedback.author.role}` : ""}</p>}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}