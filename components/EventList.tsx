"use client";

import { useQuery } from 'convex/react';
import { CalendarDays, ChevronDown, Ticket } from 'lucide-react';
import { useState } from 'react';
import { api } from '../convex/_generated/api';
import EventCard from './EventCard';
import Spinner from './Spinner';

const ITEMS_PER_PAGE = 6;

const EventList = () => {
  const events = useQuery(api.events.get);
  const [upcomingVisible, setUpcomingVisible] = useState(ITEMS_PER_PAGE);
  const [pastVisible, setPastVisible] = useState(ITEMS_PER_PAGE);

  console.log("data events: ", events);

  if (!events) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'><Spinner /></div>
    );
  }

  const upcomingEvents = events
    .filter((event) => event.eventDate > Date.now())
    .sort((a, b) => a.eventDate - b.eventDate);
  console.log("Upcoming Events: ", upcomingEvents);

  const pastEvents = events
    .filter((event) => event.eventDate <= Date.now())
    .sort((a, b) => b.eventDate - a.eventDate);

  // Get visible events
  const visibleUpcomingEvents = upcomingEvents.slice(0, upcomingVisible);
  const visiblePastEvents = pastEvents.slice(0, pastVisible);

  // Check if there are more events to load
  const hasMoreUpcoming = upcomingVisible < upcomingEvents.length;
  const hasMorePast = pastVisible < pastEvents.length;

  const loadMoreUpcoming = () => {
    setUpcomingVisible(prev => prev + ITEMS_PER_PAGE);
  };

  const loadMorePast = () => {
    setPastVisible(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="mt-2 text-gray-600">
            Discover & book tickets for amazing events
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">
              {upcomingEvents.length} Upcoming Events
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Events Grid */}
      {upcomingEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleUpcomingEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>

          {/* Load More Button for Upcoming Events */}
          {hasMoreUpcoming && (
            <div className="flex justify-center mb-12">
              <button
                onClick={loadMoreUpcoming}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <span>View More Events</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No upcoming events
          </h3>
          <p className="text-gray-600 mt-1">Check back later for new events</p>
        </div>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
            <span className="text-sm text-gray-600">
              Showing {visiblePastEvents.length} of {pastEvents.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visiblePastEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>

          {/* Load More Button for Past Events */}
          {hasMorePast && (
            <div className="flex justify-center">
              <button
                onClick={loadMorePast}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              >
                <span>View More Past Events</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EventList