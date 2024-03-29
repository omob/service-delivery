import { useEffect } from "react";
import authService from "../../services/authService";

const Logout = () => {
  useEffect(() => {
    authService.logout();
    window.location = "/";
  });
  return null;
};

export default Logout;
