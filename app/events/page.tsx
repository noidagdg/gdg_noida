"use client";

import Image from "next/image";
import { useState } from "react";
import AttendeeStats from "@/components/sections/attendee-stats";
import Agenda from "@/components/sections/agenda";
import CommunityFeedback from "@/components/sections/community-feedback";
import MomentsGallery from "@/components/sections/moments-gallery";
import { eventCatalog, eventSeriesList } from "@/lib/data/events-data";

export default function EventsPage() {
  const [selectedSeries, setSelectedSeries] = useState(eventSeriesList[0].id);
  const activeSeries = eventSeriesList.find((series) => series.id === selectedSeries) ?? eventSeriesList[0];
  const [selectedYear, setSelectedYear] = useState(activeSeries.defaultYear);
  const currentEvent = eventCatalog[selectedSeries][selectedYear] ?? eventCatalog[selectedSeries][activeSeries.defaultYear];
  const about = currentEvent.about ?? {
    heading: "About this event",
    description: "A community-first tech event that brings together builders, creators, and learners for meaningful conversations and hands-on experiences.",
  };
  const speakers = currentEvent.speakers ?? {
    heading: "Featured speakers",
    list: [],
  };

  const changeSeries = (seriesId: string) => {
    const nextSeries = eventSeriesList.find((series) => series.id === seriesId) ?? eventSeriesList[0];
    setSelectedSeries(nextSeries.id);
    setSelectedYear(nextSeries.defaultYear);
  };

  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto py-4" role="tablist" aria-label="Event series">
          {eventSeriesList.map((series) => (
            <button key={series.id} type="button" role="tab" aria-selected={selectedSeries === series.id} onClick={() => changeSeries(series.id)} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors" style={{ backgroundColor: selectedSeries === series.id ? series.brandColor : "#F0F0F1", color: selectedSeries === series.id ? "#fff" : "#4B5563" }}>
              {series.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto py-3" aria-label="Event editions">
          {activeSeries.availableYears.map((year) => (
            <button key={year} type="button" onClick={() => setSelectedYear(year)} aria-pressed={selectedYear === year} className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: selectedYear === year ? activeSeries.brandColor : "#F0F0F1", color: selectedYear === year ? "#fff" : "#4B5563" }}>
              {year}
            </button>
          ))}
        </div>

        <header className="relative mt-4 overflow-hidden rounded-2xl bg-slate-900 text-white">
          <div className="relative h-[260px] sm:h-[380px] md:h-[500px]">
            <Image src={currentEvent.branding.coverImage} alt={`${currentEvent.title} cover`} fill priority className="object-cover opacity-75" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: activeSeries.brandColor }}>{currentEvent.status}</p>
              <h1 className="text-3xl font-semibold sm:text-5xl md:text-6xl">{currentEvent.title}</h1>
              <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">{currentEvent.subtitle}</p>
              <p className="mt-4 text-sm text-white/70">{currentEvent.dates.displayDate} / {currentEvent.venue.name}, {currentEvent.venue.city}</p>
            </div>
          </div>
        </header>

        <section className="pb-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{about.heading}</p>
            <p className="max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">{about.description}</p>
          </div>
        </section>

        <section className="grid gap-4 py-12 sm:grid-cols-3">
          {currentEvent.overview.stats.map((stat) => (
            <div key={stat.id} className="border-l-4 px-5 py-3" style={{ borderColor: activeSeries.brandColor }}>
              <p className="text-3xl font-semibold text-black">{stat.value}{stat.suffix}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="pb-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{speakers.heading}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Meet the voices behind the event</h2>
            </div>
          </div>

          {speakers.list.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {speakers.list.map((speaker) => (
                <div key={`${speaker.name}-${speaker.company}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <Image src={speaker.avatar || "/assets/speakers/speaker1.svg"} alt={speaker.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="text-xl font-semibold text-slate-900">{speaker.name}</h3>
                    <p className="text-sm font-medium text-slate-600">{speaker.designation}</p>
                    <p className="text-sm text-slate-500">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              Speaker lineup will be announced soon.
            </div>
          )}
        </section>
      </div>

      <AttendeeStats data={currentEvent.attendees} />
      <CommunityFeedback heading={currentEvent.feedback.heading} reviews={currentEvent.feedback.reviews} />
      <Agenda heading={currentEvent.agenda.heading} tracks={currentEvent.agenda.tracks} />
      <MomentsGallery heading={currentEvent.gallery.heading} categories={currentEvent.gallery.categories} images={currentEvent.gallery.images} />
    </div>
  );
}
