import React from "react";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import RouteApp from "./routes";
import { Provider } from "react-redux";
import reducer from "@/store";
import { rootSaga } from "./saga";
import "./App.css";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <RouteApp />
    </Provider>
  );
};

export default App;
