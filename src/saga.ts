import { fork } from "redux-saga/effects";
import { calendarSaga } from "@/templates/Calendar/saga";

export function* rootSaga() {
  yield fork(calendarSaga);
}
