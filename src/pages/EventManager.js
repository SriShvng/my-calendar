import React, { useState, useEffect } from "react";

const EventForm = ({ onSubmit, initialData }) => {
  const [event, setEvent] = useState(
    initialData || { title: "", date: "", id: null }
  );

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <button type="submit">{event.id ? "Update" : "Add"}</button>
    </form>
  );
};

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  // Add or update an event
  const handleEventSubmit = async (event) => {
    if (event.id) {
      await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json" },
      });
    }
    setEditingEvent(null);
  };

  // Delete an event
  const handleDeleteEvent = async (id) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setEvents(events.filter((event) => event.id !== id));
  };

  // Render
  return (
    <div>
      <h2>Event Management</h2>
      {editingEvent ? (
        <EventForm onSubmit={handleEventSubmit} initialData={editingEvent} />
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <span>
              {event.title} - {event.date}
            </span>
            <button onClick={() => setEditingEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EventManager;
