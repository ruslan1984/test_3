import React, { FC, useEffect, useCallback, useState } from "react";
import { Badge, Calendar } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { BadgeProps } from "antd";
import type { Dayjs } from "dayjs";
import { requestCalendar, actions } from "./reducer";
import { reducerType } from "@/store";
import { TSelectedDate, TCalendarEvent } from "./types";
import { getEventsList } from "@/helpers";
import {
  getDateNotifiesBeforeList,
  getDateNotifiesStartList,
  getDateNotifiesEndList,
  sendBeforeNotify,
  sendEndNotify,
  sendStartNotify,
} from "./notifies";

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth()}`
  );
  const { calendarData } = useSelector(
    (state: reducerType) => state.calendarRedicer
  );
  useEffect(() => {
    dispatch(requestCalendar());
  }, []);
  useEffect(() => {
    const timerId = setInterval(() => {}, 2000);
    todayNotifies();
    return () => clearInterval(timerId);
  }, [calendarData]);

  const onSelect = useCallback(
    (date: Dayjs) => {
      const selectedDate = `${date.year()}-${date.month()}`;
      if (currentMonth !== selectedDate) {
        setCurrentMonth(selectedDate);
      } else {
        navigate(`/events/${date.year()}/${date.month()}/${date.date()}`);
      }
    },
    [calendarData, currentMonth]
  );

  const todayNotifies = useCallback(() => {
    const newDate: Date = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    const currentDate = { date, month, year };

    const currentDateEvents = getEventsList(calendarData, currentDate);
    if (!currentDateEvents) return;
    todayBeforeNotify(currentDateEvents, newDate);
    todayStartNotify(currentDateEvents, newDate);
    todayEndNotify(currentDateEvents, newDate);
  }, [calendarData]);

  const todayBeforeNotify = useCallback(
    (currentDateEvents: TCalendarEvent[], currentDate: Date) => {
      const date = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const notifyEvents = getDateNotifiesBeforeList(
        currentDateEvents,
        currentDate
      );

      if (!notifyEvents || notifyEvents.length < 1) return;
      sendBeforeNotify(notifyEvents);
      const newNotifyEvents = currentDateEvents?.map((item) => ({
        ...item,
        isAnnounced: true,
      }));
      dispatch(
        actions.updateEvent({
          year,
          month,
          date,
          calendarEvents: newNotifyEvents || [],
        })
      );
    },
    [calendarData]
  );

  const todayStartNotify = useCallback(
    (currentDateEvents: TCalendarEvent[], currentDate: Date) => {
      const date = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const notifyEvents = getDateNotifiesStartList(
        currentDateEvents,
        currentDate
      );

      if (!notifyEvents || notifyEvents.length < 1) return;
      sendStartNotify(notifyEvents);
      const newNotifyEvents = currentDateEvents?.map((item) => ({
        ...item,
        isNotifyStartAnnounced: true,
      }));
      dispatch(
        actions.updateEvent({
          year,
          month,
          date,
          calendarEvents: newNotifyEvents || [],
        })
      );
    },
    [calendarData]
  );

  const todayEndNotify = useCallback(
    (currentDateEvents: TCalendarEvent[], currentDate: Date) => {
      const date = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const notifyEvents = getDateNotifiesEndList(
        currentDateEvents,
        currentDate
      );

      if (!notifyEvents || notifyEvents.length < 1) return;
      sendEndNotify(notifyEvents);
      const newNotifyEvents = currentDateEvents?.map((item) => ({
        ...item,
        isNotifyEndAnnounced: true,
      }));
      dispatch(
        actions.updateEvent({
          year,
          month,
          date,
          calendarEvents: newNotifyEvents || [],
        })
      );
    },
    [calendarData]
  );

  const dateCellRender = useCallback(
    (value: Dayjs) => {
      const date: TSelectedDate = {
        year: value.year(),
        month: value.month(),
        date: value.date(),
      };
      const eventsList = getEventsList(calendarData, date);
      if (eventsList) {
        return (
          <ul className="events">
            {eventsList.map((item) => (
              <li key={item.content}>
                <Badge
                  status={item.eventType as BadgeProps["status"]}
                  text={item.content}
                />
              </li>
            ))}
          </ul>
        );
      }
      return "";
    },
    [calendarData]
  );

  return (
    <Calendar
      mode="month"
      onSelect={onSelect}
      dateCellRender={dateCellRender}
    />
  );
};

export default App;
