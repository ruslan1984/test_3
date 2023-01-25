import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "@/templates/Calendar";
import Events from "@/templates/Events";

const RouteApp: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/events/:year/:month/:date" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteApp;
