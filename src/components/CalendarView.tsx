/**
 * used links below as a source for the calendar
 *
 * https://www.npmjs.com/package/react-big-calendar
 * https://jquense.github.io/react-big-calendar/examples/?path=/story/about-big-calendar--page
 *
 * I also had a problem with react-big-calendar where it really messed up the styling of my application.
 * After googling for solution i found following repo : https://github.com/list-jonas/shadcn-ui-big-calendar
 * I copied the way this repo implements shadcn styling to react-big-calendar\
 * I also needed to make a lot of changes to the CSS file they provided since they are using tailwind version 3.4.1 and I'm using 4.1.
 * Mostly I just needed to remove the hsl and hsla colorspace declarations since tailwind 4 defaults to oklch in it's theming.
 *
 * AI was a huge help debugging and figuring out problems here.
 *
 */

import { luxonLocalizer, Views } from "react-big-calendar";
import { fetchAllTrainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Training } from "@/interfaces/training";
import { useState, type SetStateAction } from "react";
import ShadcnBigCalendar from "@/lib/shadcn-big-calendar";
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};
export default function CalendarView() {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const { data } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchAllTrainings,
  });

  const events: CalendarEvent[] =
    data?._embedded?.trainings?.map((training: Training) => {
      const start = DateTime.fromISO(training.date).toJSDate();
      const end = DateTime.fromISO(training.date)
        .plus({ minutes: training.duration })
        .toJSDate();

      const startTime = DateTime.fromJSDate(start).toFormat("HH.mm");
      const endTime = DateTime.fromJSDate(end).toFormat("HH.mm");

      return {
        title: `${startTime} - ${endTime} ${training.activity} ${
          training.customerName ?? ""
        }`,
        start,
        end,
        allDay: false,
      };
    }) ?? [];
  const localizer = luxonLocalizer(DateTime);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: SetStateAction<any>) => {
    setView(newView);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Training Schedule</h1>
        <p className="text-muted-foreground">
          View all scheduled training sessions
        </p>
      </div>
      <ShadcnBigCalendar
        localizer={localizer}
        style={{ height: 600, width: "100%" }}
        className="border-2 border-border rounded-lg"
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        popup
        min={new Date(2000, 1, 1, 8, 0, 0)}
        max={new Date(2000, 1, 1, 22, 0, 0)}
      />
    </div>
  );
}
