import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/molecules";
import {
  EventDetail,
  EventHistory,
  Home,
  Login,
  NewPassword,
  OrganizationDetail,
  OrganizationList,
  Register,
  ResetPassword,
  Setting,
} from "./components/pages";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin && <Header setIsLogin={setIsLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />}></Route>

        <Route path="/example-event-path" element={<EventDetail />} />
        <Route
          path="/example-event-history-path"
          element={<EventDetail type="history" />}
        />
        <Route path="/event-history" element={<EventHistory />} />

        <Route path="/organization-list" element={<OrganizationList />} />
        <Route
          path="/example-organization-path"
          element={<OrganizationDetail />}
        />

        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />

        <Route path="*" element={<p>URL Not Found!</p>} />
      </Routes>
    </>
  );
}

export default App;
