const feedbackColumns = [
  [
    {
      text: "Thanks to GDG Noida, I found the direction and inspiration to follow my passion.",
      backgroundColor: "#FFF2CC",
    },
    {
      text: "Thanks to GDG Noida, I've improved my analytical thinking and task management skills and landed great opportunities.",
      backgroundColor: "#FFE4E4",
    },
  ],

  [
    {
      text: "Thanks to GDG Noida, I've improved my analytical thinking and task management skills and landed great opportunities.",
      backgroundColor: "#FFE4E4",
    },
    {
      text: "I am grateful to Devfest Noida for providing me with this opportunity to connect with great designers.",
      backgroundColor: "#E1F5E8",
    },
  ],

  [
    {
      text: "I'll never forget speaking at the Women's Day event, connected with lot's of amazing women and listened many inspiring stories. #DareToBe.",
      backgroundColor: "#E5EEFC",
    },
    {
      text: "GDG Noida introduced me to open-source tech communities.",
      backgroundColor: "#FFF2CC",
    },
  ],
];

export default function CommunityFeedback() {
  return (
    <section className="w-full px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_4px_rgba(60,64,67,0.1)] sm:p-6 lg:p-8">
        {/* Section Heading */}
        <h2 className="mb-6 text-center text-2xl font-normal tracking-tight text-[#202124] sm:mb-8 sm:text-3xl md:text-4xl">
          Community <span className="font-bold">feedback</span>
        </h2>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {feedbackColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-5">
              {column.map((feedback, feedbackIndex) => (
                <div
                  key={feedbackIndex}
                  className={`rounded-2xl border border-white/70 px-6 py-7 shadow-[0_1px_3px_rgba(60,64,67,0.08)] ${
                    columnIndex === 2 && feedbackIndex === 1
                      ? "md:mt-auto"
                      : ""
                  }`}
                  style={{
                    backgroundColor: feedback.backgroundColor,
                  }}
                >
                  <p className="text-base leading-relaxed text-black">
                    {feedback.text}
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
