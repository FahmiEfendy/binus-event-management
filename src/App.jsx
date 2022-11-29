import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import EventHistory from "./components/EventHistory";
import OrganizationList from "./components/OrganizationList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization-list" element={<OrganizationList />} />
        <Route path="/event-history" element={<EventHistory />} />
      </Routes>
    </>
  );
}

export default App;
