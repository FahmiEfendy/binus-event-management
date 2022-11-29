import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import OrganizationList from "./components/OrganizationList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization-list" element={<OrganizationList />} />
      </Routes>
    </>
  );
}

export default App;
