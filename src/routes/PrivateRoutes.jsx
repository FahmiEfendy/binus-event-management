// Parent Wrapper to make sure its children only can be accessed when user already login (checked with token from localStorage)

import { getToken } from "../utils/storage";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  return getToken() === "" ? <Navigate to="/login" /> : children;
};

export default PrivateRoutes;
