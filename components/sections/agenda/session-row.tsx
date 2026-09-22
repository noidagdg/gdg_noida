"use client";

import { useState } from "react";
import Image from "next/image";
import { Session } from "./data";

interface SessionRowProps {
  session: Session;
}

function isValidImageSource(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  const source = value.trim();
  if (source.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(source);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function SpeakerAvatar({ name, source }: { name: string; source: unknown }) {
  const [hasLoadError, setHasLoadError] = useState(false);

  if (hasLoadError || !isValidImageSource(source)) {
    return null;
  }

  return (
    <div className="h-8 w-8 overflow-hidden rounded-full bg-[#D9D9D9] flex-shrink-0">
      <Image
        src={source}
        alt={name}
        fill
        sizes="32px"
        className="object-cover"
        onError={() => setHasLoadError(true)}
      />
    </div>
  );
}

export default function SessionRow({ session }: SessionRowProps) {
  const speakerCount = session.speakers?.length ?? 0;
  const useGridLayout = speakerCount === 3 || speakerCount === 4;

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[120px_1fr_450px] md:items-start md:gap-8 px-8 py-5">
        {/* Time */}
        <div className="pt-1">
          <p className="text-[12px] font-medium leading-5 text-[#4B5563] whitespace-nowrap">
            {session.startTime} - {session.endTime}
          </p>
        </div>

        {/* Session Title */}
        <div>
          <h3 className="text-[18px] leading-8 font-normal text-black">
            {session.title}
          </h3>
        </div>

        {/* Speakers */}
        {useGridLayout ? (
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {session.speakers?.map((speaker) => (
              <div
                key={speaker.name}
                className="flex items-start gap-3"
              >
                <SpeakerAvatar name={speaker.name} source={speaker.avatar} />

                {/* Speaker Details */}
                <div className="min-w-0">
                  <p className="text-[14px] font-medium leading-5 text-black">
                    {speaker.name}
                  </p>

                  {speaker.designation && (
                    <p className="text-[11px] leading-4 text-[#6B7280] break-words">
                      {speaker.designation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-end gap-3">
            {session.speakers?.map((speaker) => (
              <div
                key={speaker.name}
                className="flex items-center gap-3"
              >
                <SpeakerAvatar name={speaker.name} source={speaker.avatar} />

                {/* Speaker Details */}
                <div className="min-w-[180px]">
                  <p className="text-[14px] font-medium leading-5 text-black">
                    {speaker.name}
                  </p>

                  {speaker.designation && (
                    <p className="text-[11px] leading-4 text-[#6B7280] break-words">
                      {speaker.designation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-3 px-5 py-5 md:hidden">
        <p className="text-xs font-medium text-[#4B5563]">
          {session.startTime} - {session.endTime}
        </p>

        <h3 className="text-base font-medium leading-7 text-black">
          {session.title}
        </h3>

        {session.speakers?.map((speaker) => (
          <div
            key={speaker.name}
            className="flex items-center gap-3"
          >
            <SpeakerAvatar name={speaker.name} source={speaker.avatar} />

            <div>
              <p className="text-sm font-medium text-black">
                {speaker.name}
              </p>

              {speaker.designation && (
                <p className="text-xs text-[#6B7280]">
                  {speaker.designation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
