import React, { useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({
  show,
  onClose,
  onSave,
  onDelete,
  eventTitle,
  setEventTitle,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedDate,
  selectedEvent,
  location,
  setLocation,
  isAdmin,
}) => {
  if (!show) return null;

  useEffect(() => {
    if (selectedDate) {
      const initialStartTime = new Date(selectedDate);
      initialStartTime.setHours(9, 0, 0); // Default to 9:00 AM for start time

      const initialEndTime = new Date(initialStartTime);
      initialEndTime.setHours(10, 0, 0); // Default to 10:00 AM for end time

      setStartTime(formatDateForInput(initialStartTime));
      setEndTime(formatDateForInput(initialEndTime));
    }
  }, [selectedDate, setStartTime, setEndTime]);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const validDate = new Date(date);
    return validDate instanceof Date && !isNaN(validDate)
      ? validDate.toISOString().slice(0, 16)
      : "";
  };

  // Helper function to set the date value correctly
  const getFormattedDate = (date) => {
    if (!date) return "";
    const validDate = new Date(date);
    return validDate instanceof Date && !isNaN(validDate)
      ? validDate.toISOString().slice(0, 10)
      : "";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{selectedEvent ? "Edit Event" : "Add Event"}</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <label>Event Title</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            disabled={!isAdmin} // Disable if normal user
          />
          <label>Date</label>
          <input
            type="text"
            value={getFormattedDate(selectedDate)} // Display the formatted date
            disabled
          />
          <label>From (Start Time)</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={!isAdmin} // Disable if normal user
          />
          <label>To (End Time)</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!isAdmin} // Disable if normal user
          />
          <label>Frequency</label>
          <select value="Does not repeat" disabled>
            <option>Does not repeat</option>
          </select>
          <label>Location</label>
          <input
            type="text"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Input Event Location"
            disabled={!isAdmin} // Disable if normal user
          />
          <div className="modal-footer">
            {selectedEvent ? (
              <>
                {isAdmin && (
                  <>
                    <button className="delete-btn" onClick={onDelete}>
                      Delete Event
                    </button>
                    <button className="save-btn" onClick={onSave}>
                      Update Event
                    </button>
                  </>
                )}
                {!isAdmin && (
                  <button className="close-btn" onClick={onClose}>
                    Close
                  </button>
                )}
              </>
            ) : (
              <button className="save-btn" onClick={onSave}>
                Save Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
