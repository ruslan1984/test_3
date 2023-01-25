import React, { FC, useState, useMemo, memo, useCallback } from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/templates/Calendar/reducer";
import { TSelectedDate, TCalendarEvent } from "@/templates/Calendar/types";
import Presenter from "./Presenter";
import { reducerType } from "@/store";
import { getEventsList, getMaxId } from "@/helpers";

interface IEventList {
  year: number;
  month: number;
  date: number;
}

const EventList: FC<IEventList> = ({ year, month, date }: IEventList) => {
  const dispatch = useDispatch();

  const { calendarData } = useSelector(
    (state: reducerType) => state.calendarRedicer
  );
  const selectedDate: TSelectedDate = useMemo(
    () => ({
      year,
      month,
      date,
    }),
    [year, month, date]
  );

  const eventsList = useMemo(
    () => getEventsList(calendarData, selectedDate),
    [calendarData, selectedDate]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const removeEvent = useCallback(
    (removeId: number) => () => {
      if (!selectedDate) return;
      const newEventsList = eventsList?.filter(({ id }) => id !== removeId);
      dispatch(
        actions.updateEvent({
          year: selectedDate.year,
          month: selectedDate.month,
          date: selectedDate.date,
          calendarEvents: newEventsList || [],
        })
      );
      notification.open({
        message: "Событие удалено",
      });
    },
    [eventsList]
  );

  const updateEvent = useCallback(
    (values: TCalendarEvent, activeId?: number | undefined) => {
      if (!selectedDate || activeId === undefined) return;
      const newValue: TCalendarEvent = { ...values, isAnnounced: false };
      let newEventsList;
      if (activeId === -1) {
        const id = getMaxId(eventsList);
        newEventsList = [...(eventsList || []), { ...newValue, id: id + 1 }];
      } else {
        newEventsList = eventsList?.map((item) =>
          item.id === activeId ? newValue : item
        );
      }
      dispatch(
        actions.updateEvent({
          year: selectedDate.year,
          month: selectedDate.month,
          date: selectedDate.date,
          calendarEvents: newEventsList || [],
        })
      );
      setIsModalOpen(false);
      notification.open({
        message: "Данные обновлены",
      });
    },
    [eventsList]
  );

  return (
    <Presenter
      isModalOpen={isModalOpen}
      eventsList={eventsList}
      removeEvent={removeEvent}
      updateEvent={updateEvent}
      setIsModalOpen={setIsModalOpen}
    />
  );
};

export default memo(EventList);
