import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { TCalendarReducer, TYearList, TUpdateEvent } from "./types";

export const defaultState: TCalendarReducer = {
  calendarData: {},
};

export const requestCalendar = createAction("requestCalendar");

export const calendarSlice = createSlice({
  name: "Calendar",
  initialState: defaultState,
  reducers: {
    setCalendarData: (
      state,
      { payload: calendarData }: PayloadAction<TYearList>
    ) => ({ ...state, calendarData }),

    updateEvent: (
      state,
      {
        payload: { year, month, date, calendarEvents },
      }: PayloadAction<TUpdateEvent>
    ) => {
      let calendarCurrentData = { ...state.calendarData };
      if (!calendarCurrentData[year]) {
        calendarCurrentData = { ...calendarCurrentData, [year]: {} };
      }
      if (!calendarCurrentData[year][month]) {
        calendarCurrentData = {
          ...calendarCurrentData,
          [year]: {
            ...calendarCurrentData[year],
            [month]: {},
          },
        };
      }
      if (!calendarCurrentData[year][month][date]) {
        calendarCurrentData = {
          ...calendarCurrentData,
          [year]: {
            ...calendarCurrentData[year],
            [month]: {
              ...calendarCurrentData[year][month],
              [date]: [],
            },
          },
        };
      }
      if (
        calendarCurrentData[year] &&
        calendarCurrentData[year][month] &&
        calendarCurrentData[year][month][date]
      ) {
        const cD1 = {
          ...calendarCurrentData[year][month],
          [date]: calendarEvents,
        };
        const cM1 = { ...calendarCurrentData[year], [month]: cD1 };
        const calendarData = { ...calendarCurrentData, [year]: cM1 };
        return { ...state, calendarData };
      }
      return { ...state };
    },
  },
});
export const { actions, reducer } = calendarSlice;
