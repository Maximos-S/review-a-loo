import { Button } from "@chakra-ui/react";
import React, {useContext,} from "react";
import { logout } from "../../services/auth";
import { UserContext } from "../context/UserContext";

const LogoutButton = () => {
  const {setAuthenticated, setUser, setBusinesses} = useContext(UserContext)

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setUser(false);
    setBusinesses(false)
  };

  return <Button   color="#472820" colorScheme="yellow" id="button-override" onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
