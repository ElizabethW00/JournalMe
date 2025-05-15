"use client";
import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Scribble from "@/components/Scribble";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const [journals, setJournals] = useState([]);
  const [calenderView, setCalenderView] = useState("dayGridMonth");
  const calendarRef = useRef<any>(null);
  const router = useRouter();

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

  useEffect(() => {
    axios
      .get("/api/journals")
      .then((res) => {
        if (res.data?.journals) {
          setJournals(res.data.journals);
        }
      })
      .catch((err) => {
        console.error("Error fetching journal:", err);
        toast.error("Failed to load journal. Try again later!");
      });
  }, []);

  return (
    <section
      id="calendarWrapper"
      className="flex w-full justify-evenly items-center sm:gap-4 sm:px-12 overflow-x-hidden"
    >
      {/* Sidebar with custom view buttons */}
      <div className="flex flex-col sm:p-4">
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
          eventClick={(event: any) => {
            const journal = event.event._def;
            if (!journal.extendedProps.locked)
              router.push(`/write/${journal.publicId}`);
          }} // Handle clicking on events (e.g., to delete them).
          // eventsSet={(events) => setJournals(events)} // Update state with current events whenever they change.
          events={journals.map((journal: any) => {
            const start = new Date(journal.date_created);
            const end = new Date(start.getTime() + 60 * 60 * 1000);
            console.log(journal.color);

            return {
              id: journal._id,
              start,
              end,
              title: !journal.locked
                ? journal.text.substring(0, 10) + " ..."
                : "",
              user_id: journal.user_id,
              locked: journal.locked,
              className: !journal.locked ? "cursor-pointer" : undefined,
              backgroundColor: journal.locked ? "lightgray" : journal.color,
              borderColor: journal.locked ? "lightgray" : journal.color,
            };
          })}
        />
      </div>
    </section>
  );
};

export default Calendar;
