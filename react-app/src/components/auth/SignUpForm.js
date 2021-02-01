import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { UserContext } from "../context/UserContext";

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const {setUser} = useContext(UserContext)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <Stack>
          <label>User Name</label>
          <Input backgroundColor="#f3f0e3" color="#472820"
            type="text"
            name="username"
            placeholder="User Name"
            onChange={updateUsername}
            value={username}
            ></Input>
          <label>Email</label>
          <Input backgroundColor="#f3f0e3" color="#472820"
            type="text"
            placeholder="Email"
            name="email"
            onChange={updateEmail}
            value={email}
            ></Input>
          <label>Password</label>
          <Input backgroundColor="#f3f0e3" color="#472820"
            type="password"
            placeholder="Password"
            name="password"
            onChange={updatePassword}
            value={password}
            ></Input>
          <label>Repeat Password</label>
          <Input backgroundColor="#f3f0e3" color="#472820"
            type="password"
            placeholder="Password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></Input>
        <Button   color="#472820" colorScheme="yellow" id="button-override" type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
