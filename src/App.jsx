import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import EventHistory from "./components/EventHistory";
import OrganizationList from "./components/OrganizationList";
import EventDetail from "./components/EventDetail";
import OrganizationDetail from "./components/OrganizationDetail";

function App() {
  return (
    <>
      <Header />
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
      </Routes>
    </>
  );
}

export default App;
