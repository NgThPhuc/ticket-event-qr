"use client";

import { useQuery } from "convex/react";
import { CalendarDays, Filter, Search, SortAsc, Ticket } from "lucide-react";
import { useSearchParams } from "next/navigation"; // ✅ Xóa useRouter
import { useState } from "react";
import EventCard from "../../components/EventCard";
import Spinner from "../../components/Spinner";
import { api } from "../../convex/_generated/api";

export default function EventsPage() {
  // ✅ Xóa dòng: const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");

  const events = useQuery(api.events.get);

  if (!events) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Filter events
  let filteredEvents = events;

  if (filter === "upcoming") {
    filteredEvents = events.filter((event) => event.eventDate > Date.now());
  } else if (filter === "past") {
    filteredEvents = events.filter((event) => event.eventDate <= Date.now());
  }

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
    );
  }

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return a.eventDate - b.eventDate;
    } else {
      return a.price - b.price;
    }
  });

  const upcomingCount = events.filter((e) => e.eventDate > Date.now()).length;
  // ✅ Xóa dòng: const pastCount = events.filter((e) => e.eventDate <= Date.now()).length;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Browse All Events</h1>
          <p className="text-blue-100 text-lg">
            Discover amazing events happening near you
          </p>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full py-2 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {upcomingCount} Upcoming
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Ticket className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {events.length} Total Events
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "past"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                Past
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <SortAsc className="w-5 h-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "price")}
              aria-label="Sort events by"  // ✅ Thêm aria-label cho accessibility
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{sortedEvents.length}</span>{" "}
            {sortedEvents.length === 1 ? "event" : "events"}
          </p>
        </div>

        {/* Events Grid */}
        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Check back later for new events"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}