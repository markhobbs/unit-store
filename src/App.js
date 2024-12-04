/* App.js */

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Collect from "./pages/Collect";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import More from "./pages/More";
import Station from "./pages/Station";
import NoPage from "./pages/NoPage";
import "./App.css";

export default function App() {
    return (
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Collect />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/more" element={<More />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/station" element={<Station />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
  );
};
