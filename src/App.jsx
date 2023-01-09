import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import EventHistory from "./components/EventHistory";
import OrganizationList from "./components/OrganizationList";
import EventDetail from "./components/EventDetail";
import OrganizationDetail from "./components/OrganizationDetail";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log("App.jsx rendered");

  return (
    <>
      {isLogin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization-list" element={<OrganizationList />} />
        <Route path="/event-history" element={<EventHistory />} />
        <Route path="/example-event-path" element={<EventDetail />} />
        <Route
          path="/example-event-history-path"
          element={<EventDetail type="history" />}
        />
        <Route
          path="/example-organization-path"
          element={<OrganizationDetail />}
        />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
