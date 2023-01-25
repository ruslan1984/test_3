import {
  TYearList,
  TCalendarEvent,
  TSelectedDate,
  TEventTime,
} from "./templates/Calendar/types";

export const getEventsList = (
  calendarData: TYearList,
  selectedDate?: TSelectedDate
): TCalendarEvent[] | undefined => {
  if (
    !calendarData ||
    selectedDate?.year === undefined ||
    selectedDate?.month === undefined ||
    selectedDate?.date === undefined ||
    !selectedDate
  ) {
    return undefined;
  }
  const year = selectedDate.year;
  const month = selectedDate.month;
  const date = selectedDate.date;
  if (
    calendarData[year] &&
    calendarData[year][month] &&
    calendarData[year][month][date]
  ) {
    return calendarData[year][month][date];
  }
  return undefined;
};

export const timeToString = (time: TEventTime): string =>
  `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(
    2,
    "0"
  )}`;

export const getMaxId = (arr?: { id: number }[]): number =>
  arr?.reduce((cur, next) => (next.id > cur ? next.id : cur), 0) || 0;
