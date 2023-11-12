import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(`Logging in with Email: ${email} and Password: ${password}`);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-display mb-8">log in</h1>
      <div className="h-fit w-fit rounded-lg flex flex-col items-center space-y-4">
        <form className="px-4 flex flex-col items-center space-y-4">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </form>
        <div className="flex space-x-4">
          <Link className="underline" to={"/signup"}>
            Signup
          </Link>
          <Link className="underline" to={"https://www.google.com"}>
            forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
