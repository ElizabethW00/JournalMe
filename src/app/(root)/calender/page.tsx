"use client";
import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Scribble from "@/components/Scribble";

const Calendar = () => {
  const [calenderView, setCalenderView] = useState("dayGridMonth");
  const calendarRef = useRef<any>(null);

  const handleViewChange = (view: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      setCalenderView(view);
    }
  };

  const ChangeViewButton = ({
    text,
    view,
    className,
  }: {
    text: string;
    view: string;
    className?: string;
  }) => {
    const isActive = calenderView === view;
    return (
      <button
        onClick={() => handleViewChange(view)}
        className={`hyperlink flex items-center ${className} text-lg ${
          isActive && "font-bold"
        }`}
      >
        {text}
        <Scribble
          regular
          className="left-auto text-lg"
          innerClassName="relative -translate-y-1/2"
          text={text}
          animate={!isActive}
        />
      </button>
    );
  };

  return (
    <section
      id="calendarWrapper"
      className="flex w-full justify-evenly items-center gap-4 px-12 overflow-x-hidden"
    >
      {/* Sidebar with custom view buttons */}
      <div className="flex flex-col p-4">
        <ChangeViewButton
          text={"Day"}
          view={"timeGridDay"}
          className="w-[47px]"
        />
        <ChangeViewButton
          text={"Week"}
          view={"timeGridWeek"}
          className="w-[47px]"
        />
        <ChangeViewButton
          text={"Month"}
          view={"dayGridMonth"}
          className="w-[49px]"
        />
      </div>

      {/* Main calendar area */}
      <div className="w-9/12 mt-8">
        <FullCalendar
          height={"80vh"}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
            // right: "dayGridMonth,timeGridWeek,timeGridDay",
          }} // Set header toolbar options.
          initialView="dayGridMonth"
          selectable={true}
          selectMirror={true} // Mirror selections visually.
          dayMaxEvents={true} // Limit the number of events displayed per day.
          // eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
          // eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
          initialEvents={
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("events") || "[]")
              : []
          } // Initial events loaded from local storage.
        />
      </div>
    </section>
  );
};

export default Calendar;
