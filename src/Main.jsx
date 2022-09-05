import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import Room from "./components/Room";

function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="chatroom" element={<Chatroom />} />
        <Route path="chatroom/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default Main;
