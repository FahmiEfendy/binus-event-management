import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/molecules";
import {
  HomePenyelenggara,
  LoginPenyelenggara,
} from "./components/pages/penyelenggara";
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
  const [isLogin, setIsLogin] = useState((localStorage.getItem("_loginstatus")
                  && localStorage.getItem("_loginstatus").toString()==="true"));

  localStorage.setItem("_loginstatus", isLogin)

  return (
    <>
      {isLogin && <Header setIsLogin={setIsLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/update-profile/:mahasiswaId"
          element={<Setting />}
        ></Route>

        <Route path="/detail/:eventId" element={<EventDetail />} />
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

        <Route
          path="*"
          element={
            <p style={{ margin: "1rem", fontWeight: "bold" }}>
              URL Not Found !
            </p>
          }
        />

        {/* Penyelenggara */}
        <Route
          path="/penyelenggara/login"
          element={<LoginPenyelenggara setIsLogin={setIsLogin} />}
        />
        <Route path="/penyelenggara/" element={<HomePenyelenggara />} />
      </Routes>
    </>
  );
}

export default App;
