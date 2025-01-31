import "./../styles/CalendarPage.css";
import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal"; // Import Modal component

const localizer = momentLocalizer(moment);

const CalendarPage = ({ isAdmin }) => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [location, setLocation] = useState("");

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleLogout = () => {
    alert("Logged out!");
    window.location.href = "/";
  };

  const handleDateClick = (date) => {
    const validDate = new Date(date); // Ensure selectedDate is a Date object
    setSelectedDate(validDate);

    // Check if there are any events already created for this date
    const eventsOnDate = events.filter(
      (event) =>
        new Date(event.start).toDateString() === validDate.toDateString()
    );

    if (eventsOnDate.length > 0) {
      // If there are events for the selected date, set the first event for editing
      setSelectedEvent(eventsOnDate[0]);
      setEventTitle(eventsOnDate[0].title);
      setStartTime(eventsOnDate[0].start);
      setEndTime(eventsOnDate[0].end);
      setLocation(eventsOnDate[0].location);
    } else {
      // If no event exists, prepare for creating a new event
      setSelectedEvent(null);
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setLocation("");
    }

    setShowEventForm(true); // Show the event form/modal
  };

  const handleEventClick = (event) => {
    if (isAdmin) {
      // Admin can edit event
      setSelectedEvent(event);
      setSelectedDate(event.start);
      setEventTitle(event.title);
      setStartTime(event.start);
      setEndTime(event.end);
      setLocation(event.location);
      setShowEventForm(true);
    } else {
      // Normal user can only view event details
      setSelectedEvent(event);
      setSelectedDate(event.start);
      setEventTitle(event.title);
      setStartTime(event.start);
      setEndTime(event.end);
      setLocation(event.location);
      setShowEventForm(true);
    }
  };

  const handleSaveEvent = () => {
    if (selectedDate && eventTitle && startTime && endTime) {
      const newEvent = {
        title: eventTitle,
        start: new Date(startTime), // Ensure start is a Date object
        end: new Date(endTime), // Ensure end is a Date object
        allDay: true,
        location: location || "Unknown", // Add location to the event
      };

      if (selectedEvent) {
        // Edit existing event
        const updatedEvents = events.map((event) =>
          event === selectedEvent ? newEvent : event
        );
        setEvents(updatedEvents);
      } else {
        // Add new event
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }

      setShowEventForm(false);
      alert("Event saved successfully!");
    } else {
      alert("Please fill all the details.");
    }
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setShowEventForm(false);
    setSelectedEvent(null);
    alert("Event deleted successfully!");
  };

  return (
    <div className="calendar-page">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="header">
        <h1>Special Events Calendar</h1>
      </div>

      {/* Popup Modal for Event Creation or Viewing */}
      <Modal
        show={showEventForm}
        onClose={() => setShowEventForm(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        selectedEvent={selectedEvent}
        selectedDate={selectedDate}
        location={location}
        setLocation={setLocation}
        isAdmin={isAdmin}
      />

      <div className="main-container">
        <div className="main-calendar">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "85vh", width: "100%" }}
            onSelectSlot={({ start }) => handleDateClick(start)}
            onSelectEvent={handleEventClick}
            selectable={isAdmin} // Allow only admin to select dates
          />
        </div>
        <div className="small-calendar">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            defaultView="month"
            style={{ height: "300px", width: "100%" }}
            onSelectSlot={({ start }) => handleDateClick(start)}
            onSelectEvent={handleEventClick}
            selectable={isAdmin} // Allow only admin to select dates
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
