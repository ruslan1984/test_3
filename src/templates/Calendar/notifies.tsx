import React from "react";
import { notification } from "antd";
import { TCalendarEvent } from "./types";
import { timeToString } from "@/helpers";
import { SmileOutlined } from "@ant-design/icons";

export const sendBeforeNotify = (notifyEvents: TCalendarEvent[]) => {
  notifyEvents?.map(({ content, time: { from, to } }) => {
    notification.open({
      message: `Напоминание`,
      description: `У вас запланированно "${content}": c ${timeToString(
        from
      )} до ${timeToString(to)}`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    `${from} - ${to}: ${content} `;
  });
};
export const sendStartNotify = (notifyEvents: TCalendarEvent[]) => {
  notifyEvents?.map(({ content, time: { from, to } }) => {
    notification.open({
      message: `Напоминание`,
      description: `Мерприятие "${content}" нвчнется через 5 минут`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    `${from} - ${to}: ${content} `;
  });
};

export const sendEndNotify = (notifyEvents: TCalendarEvent[]) => {
  notifyEvents?.map(({ content, time: { from, to } }) => {
    notification.open({
      message: `Напоминание`,
      description: `Мерприятие "${content}" закончилось`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    `${from} - ${to}: ${content} `;
  });
};

export const getDateNotifiesBeforeList = (
  currentDateEvents: TCalendarEvent[],
  currentDate: Date
): TCalendarEvent[] => {
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return currentDateEvents?.filter(
    ({ isAnnounced, time: { from }, notifyBefore }) => {
      const dateTo = new Date(year, month, date, from.hour, from.minute);
      const dateFrom = new Date(
        year,
        month,
        date,
        from.hour - notifyBefore,
        from.minute
      );
      let isNotyfy =
        dateFrom.getTime() <= currentDate.getTime() &&
        dateTo.getTime() >= currentDate.getTime();
      return !isAnnounced && isNotyfy;
    }
  );
};

export const getDateNotifiesStartList = (
  currentDateEvents: TCalendarEvent[],
  currentDate: Date
): TCalendarEvent[] => {
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return currentDateEvents?.filter(
    ({ isNotifyStartAnnounced, time: { from } }) => {
      const dateTo = new Date(year, month, date, from.hour, from.minute);
      const dateFrom = new Date(year, month, date, from.hour, from.minute - 5);
      let isNotyfy =
        dateFrom.getTime() <= currentDate.getTime() &&
        dateTo.getTime() >= currentDate.getTime();
      return !isNotifyStartAnnounced && isNotyfy;
    }
  );
};

export const getDateNotifiesEndList = (
  currentDateEvents: TCalendarEvent[],
  currentDate: Date
): TCalendarEvent[] => {
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return currentDateEvents?.filter(({ isNotifyEndAnnounced, time: { to } }) => {
    const dateFrom = new Date(year, month, date, to.hour, to.minute);
    const dateTo = new Date(year, month, date, to.hour, to.minute + 5);
    let isNotyfy =
      dateFrom.getTime() <= currentDate.getTime() &&
      dateTo.getTime() >= currentDate.getTime();
    return !isNotifyEndAnnounced && isNotyfy;
  });
};
