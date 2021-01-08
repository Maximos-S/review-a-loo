import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated, setUser}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setUser(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
