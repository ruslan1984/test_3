import { combineReducers } from "redux";
import { reducer as calendarRedicer } from "@/templates/Calendar/reducer";

export const reducer = combineReducers({
  calendarRedicer,
});

export type reducerType = ReturnType<typeof reducer>;
export default reducer;
