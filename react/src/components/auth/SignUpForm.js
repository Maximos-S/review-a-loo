import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
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
          <Input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            ></Input>
          <label>Email</label>
          <Input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            ></Input>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            ></Input>
          <label>Repeat Password</label>
          <Input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></Input>
        <Button id="button-override" type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
