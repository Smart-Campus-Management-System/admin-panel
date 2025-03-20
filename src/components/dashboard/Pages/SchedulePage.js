import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";


const SchedulePage = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "C++ Class",
      start: "2025-03-12T08:00:00",
      end: "2025-03-12T10:00:00",
      description: "Learn the fundamentals of C++ programming.",
    },
    {
      id: "2",
      title: "Python Workshop",
      start: "2025-03-13T14:00:00",
      end: "2025-03-13T16:00:00",
      description: "Advanced Python programming techniques.",
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: ""
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  useEffect(() => {
    handleGetAll()
  }, [newEvent])

  const handleGetAll = async () => {
    const responseAll = await axios.get('http://localhost:4000/api/v1/events/all')
    setEvents(responseAll.data)
  }

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill in all required fields.");
      return;
    }

    const eventToAdd = {
      ...newEvent,
      id: String(Date.now())
    };

    const response = await axios.post('http://localhost:4000/api/v1/events', eventToAdd, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('====================================');
    console.log(response);
    console.log('====================================');

    if (response.status === 201) {
      const newNotification = {
        message:'Admin add a new event "'+eventToAdd.title+'" '+eventToAdd.description+' Held from '+eventToAdd.start+' to '+eventToAdd.end+'',
        status:'unread'
      }
      const response = await axios.post('http://localhost:4000/api/v1/notifications',
        newNotification,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('====================================');
      console.log(response);
      console.log('====================================');
    }

    setEvents(prevEvents => [...prevEvents, eventToAdd]);
    setNewEvent({ title: "", start: "", end: "", description: "" });
    setIsAddEventModalOpen(false);
  };

  const deleteEvent = async (eventId) => {
    const response = await axios.delete('http://localhost:4000/api/v1/events/' + eventId)
    console.log(response);
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const generateCalendarView = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= new Date(year, month, day) && eventDate < new Date(year, month, day + 7);
    });

    switch (viewMode) {
      case 'month':
        return generateMonthView(year, month, filteredEvents);
      case 'week':
        return generateWeekView(year, month, day, filteredEvents);
      default:
        return generateMonthView(year, month, filteredEvents);
    }
  };

  const generateMonthView = (year, month, filteredEvents) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayEvents = filteredEvents.filter(event =>
        new Date(event.start).toDateString() === currentDate.toDateString()
      );
      days.push({ date: currentDate, events: dayEvents });
    }

    return days;
  };

  const generateWeekView = (year, month, day, filteredEvents) => {
    const weekStart = new Date(year, month, day - new Date(year, month, day).getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);

      const dayEvents = filteredEvents.filter(event =>
        new Date(event.start).toDateString() === currentDate.toDateString()
      );

      days.push({ date: currentDate, events: dayEvents });
    }

    return days;
  };

  const changeDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    }
    setSelectedDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  };

  const renderView = () => {
    const calendarData = generateCalendarView();

    switch (viewMode) {
      case 'month':
        return (
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold text-cyan-400">{day}</div>
            ))}
            {calendarData.map((day, index) => (
              <div
                key={index}
                className={`border border-gray-700 p-2 min-h-[100px] ${day ? 'bg-gray-800/50' : 'bg-gray-900/50'} ${day && isToday(day.date) ? 'border-cyan-500 border-2' : ''}`}
              >
                {day && (
                  <>
                    <div className="text-sm text-gray-300">{day.date.getDate()}</div>
                    {day.events.map(event => (
                      <div
                        key={event.id}
                        className="bg-cyan-900/50 text-cyan-200 rounded p-1 mt-1 text-xs flex justify-between items-center border border-cyan-500/20"
                      >
                        <span>{event.title}</span>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        );
      case 'week':
        return (
          <div className="grid grid-cols-7 gap-2 text-center h-full">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold text-cyan-400">{day}</div>
            ))}
            {calendarData.map((day, index) => (
              <div
                key={index}
                className={`border border-gray-700 p-2 flex flex-col justify-between ${day ? 'bg-gray-800/50 h-full' : 'bg-gray-900/50'} ${day && isToday(day.date) ? 'border-cyan-500 border-2' : ''}`}
              >
                {day && (
                  <>
                    <div className="text-sm text-gray-300">{day.date.getDate()}</div>
                    {day.events.map(event => (
                      <div
                        key={event.id}
                        className="bg-cyan-900/50 text-cyan-200 rounded p-1 mt-1 text-xs flex justify-between items-center border border-cyan-500/20"
                      >
                        <span>{event.title}</span>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <main className="p-4">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-6 p-4">
            <h1 className="text-2xl font-bold text-white">Class Schedule</h1>
            <p className="text-gray-300 text-sm">
              Manage and view your class schedule here.
            </p>
          </div>

          {/* Calendar Controls */}
          <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden mb-6">
            <div className="p-4 flex flex-wrap justify-between items-center">
              <div className="flex space-x-2 mb-2 sm:mb-0">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded ${viewMode === 'month' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded ${viewMode === 'week' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Week
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={goToToday}
                  className="px-3 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors duration-200 text-sm"
                >
                  Today
                </button>
                <button
                  onClick={() => changeDate(-1)}
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Previous
                </button>
                <h2 className="text-cyan-300 font-medium px-2">
                  {viewMode === 'month' ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : selectedDate.toDateString()}
                </h2>
                <button
                  onClick={() => changeDate(1)}
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Next
                </button>
              </div>

              <button
                onClick={() => setIsAddEventModalOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors duration-200 text-sm mt-2 sm:mt-0"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden">
            <div className="p-4">
              {renderView()}
            </div>
          </div>
        </div>
      </main>

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 border border-cyan-500/20">
            <h2 className="text-xl font-bold mb-4 text-white">Add New Event</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-gray-200 text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="Event title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="start" className="block text-gray-200 text-sm font-medium">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  value={newEvent.start}
                  onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="end" className="block text-gray-200 text-sm font-medium">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="end"
                  value={newEvent.end}
                  onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="block text-gray-200 text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="Event description"
                  rows="3"
                />
              </div>
              <div className="pt-4 flex justify-between space-x-4">
                <button
                  onClick={addEvent}
                  className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 font-medium"
                >
                  Add Event
                </button>
                <button
                  onClick={() => setIsAddEventModalOpen(false)}
                  className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
