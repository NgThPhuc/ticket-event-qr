"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import background from '../images/background.png';

const categories = [
  { id: 'music', label: 'Popular: Music' },
  { id: 'conferences', label: 'Conferences' },
  { id: 'sports', label: 'Sports' },
  { id: 'theater', label: 'Theater' },
  { id: 'comedy', label: 'Comedy' },
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative text-white py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src={background}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Find Your Next Event
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover amazing events happening near you. From concerts to
          conferences, find tickets to the experiences you love.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full py-4 px-12 bg-white text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search Events
          </button>
        </form>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => router.push(`/search?q=${category.id}`)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-sm border border-white/30"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}