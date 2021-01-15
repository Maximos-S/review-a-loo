import { Stack,Input, Button } from "@chakra-ui/react";
import React, { useState, useContext, } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { UserContext } from "../context/UserContext";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAuthenticated, authenticated} = useContext(UserContext)

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const user = await login("demo@demo.com","password");
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors)
    }

  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <Stack>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </Stack>
      <Stack>
        <label htmlFor="email">Email</label>
        <Input backgroundColor="#f3f0e3" color="#472820"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />

        <label htmlFor="password">Password</label>
        <Input backgroundColor="#f3f0e3" color="#472820"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <Button color="#472820" colorScheme="yellow" id="button-override" type="submit">Login</Button>
        <Button  color="#472820" colorScheme="yellow" id="button-override" onClick={loginDemo} >Demo User</Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
