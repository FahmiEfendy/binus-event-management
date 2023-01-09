import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/pages/Home";
import Header from "./components/molecules/Header";
import EventHistory from "./components/pages/EventHistory";
import OrganizationList from "./components/pages/OrganizationList";
import EventDetail from "./components/pages/EventDetail";
import OrganizationDetail from "./components/pages/OrganizationDetail";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <>
      {isLogin ? (
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
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<p>URL Not Found!</p>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
