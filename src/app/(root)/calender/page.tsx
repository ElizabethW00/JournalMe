"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css";

export default function Calendar() {
  return (
    <section className="cal py-12">
      {/* pass in custom journal id link into url */}
      {/* journal data structure:
        - id
        - title
        - date
        - content
      */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[{ title: "event 1", date: "2025-04-01", url: "/" }]}
      />
    </section>
  );
}
