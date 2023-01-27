import { Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "./routes";
import { Header } from "./components/molecules";
import {
  HomePenyelenggara,
  LoginPenyelenggara,
  // SettingPenyelenggara,
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
import { getToken } from "./utils/storage";

function App() {
  return (
    <>
      {getToken() !== "" && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/update-profile/:mahasiswaId"
          element={
            <PrivateRoutes>
              <Setting />
            </PrivateRoutes>
          }
        ></Route>

        <Route
          path="/detail/:eventId"
          element={
            <PrivateRoutes>
              <EventDetail />
            </PrivateRoutes>
          }
        />
        <Route
          path="/example-event-history-path"
          element={
            <PrivateRoutes>
              <EventDetail type="history" />
            </PrivateRoutes>
          }
        />
        <Route
          path="/event-history"
          element={
            <PrivateRoutes>
              <EventHistory />
            </PrivateRoutes>
          }
        />

        <Route
          path="/organization-list"
          element={
            <PrivateRoutes>
              <OrganizationList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/example-organization-path"
          element={
            <PrivateRoutes>
              <OrganizationDetail />
            </PrivateRoutes>
          }
        />

        <Route path="/login" element={<Login />} />
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
        <Route path="/penyelenggara/login" element={<LoginPenyelenggara />} />
        <Route
          path="/penyelenggara/"
          element={
            <PrivateRoutes>
              <HomePenyelenggara />
            </PrivateRoutes>
          }
        />
        {/* <Route
          path="/penyelenggara/update-profile/:mahasiswaId"
          element={
            <PrivateRoutes>
              <SettingPenyelenggara />
            </PrivateRoutes>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
