import { takeEvery, put, call, select } from "redux-saga/effects";
import { actions, requestCalendar } from "./reducer";
import { reducerType } from "@/store";
import { TYearList } from "./types";

function* requestCalendarSaga() {
  try {
    const localData: string = yield localStorage.getItem("calendar");
    const calendarData: TYearList = yield JSON.parse(localData);
    yield put(actions.setCalendarData(calendarData));
  } catch (e) {
    console.error((e as Error).message);
  }
}

function* updateEventSaga() {
  try {
    const {
      calendarRedicer: { calendarData },
    }: reducerType = yield select();
    yield localStorage.setItem("calendar", JSON.stringify(calendarData));
  } catch (e) {
    console.error((e as Error).message);
  }
}

export function* calendarSaga() {
  yield takeEvery(requestCalendar, requestCalendarSaga);
  yield takeEvery(actions.updateEvent, updateEventSaga);
}
