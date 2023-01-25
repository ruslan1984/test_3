export type TCalendarReducer = {
  calendarData: TYearList;
};
export type TUpdateEvent = {
  year: number;
  month: number;
  date: number;
  calendarEvents: TCalendarEvent[];
};

export type TEventType = "warning" | "success" | "error";
export type TEventTime = Record<"hour" | "minute", number>;
export type TEventTimeInterval = Record<"from" | "to", TEventTime>;
export type TCalendarEvent = {
  id: number;
  time: TEventTimeInterval;
  content: string;
  eventType: TEventType;
  notifyBefore: number;
  isAnnounced?: boolean;
  isNotifyStartAnnounced?: boolean;
  isNotifyEndAnnounced?: boolean;
};

export type TDaysList = { [key in number]: TCalendarEvent[] };
export type TMounthList = { [key in number]: TDaysList };
export type TYearList = { [key in number]: TMounthList };

export type TSelectedDate = {
  year: number;
  month: number;
  date: number;
  dateStr?: string;
};
