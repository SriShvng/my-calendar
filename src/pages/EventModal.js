import React, { useState } from "react";
import "../styles/Modal.css"; // Import the Modal CSS
import { FaTimes } from "react-icons/fa"; // Close icon

const EventModal = ({ onClose, onSave }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSaveEvent = () => {
    if (eventTitle && startTime && endTime) {
      onSave({ eventTitle, startTime, endTime });
    } else {
      alert("Please fill all the fields!");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Event</h3>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSaveEvent}>Save Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
