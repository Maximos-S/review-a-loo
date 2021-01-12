import { Button } from "@chakra-ui/react";
import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated, setUser}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setUser(false);
  };

  return <Button onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
