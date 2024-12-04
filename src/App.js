/* App.js */

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Record from "./pages/Record";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Details from "./pages/Details";
import Create from "./pages/Create";
import NoPage from "./pages/NoPage";
import "./App.css";

export default function App() {
    return (
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/record" element={<Record />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/station/create" element={<Create />} />
              <Route path="/station/details" element={<Details />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
  );
};
