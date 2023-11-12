import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setAuthenticatedUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        { email, password },
        { withCredentials: false }
      );
      const data = response.data;
      console.log("Login API response:", data); // Log the entire response for debugging

      if (data.user) {
        console.log("Login successful");
        alert(
          "You succefully logged in, you will be redirected to the homescreen"
        ); //alert user that he is logged in
        // Set the user as authenticated in the Header component
        setAuthenticatedUser(data.user);
        // store the user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.user.email })
        );
        // Redirect to the homepage after successful login
        navigate("/Home");
      } else {
        console.error("Login failed, user:", email);
      }
    } catch (error) {
      console.log(`Logging in with Email: ${email} and Password: ${password}`);
      console.error("Error logging in:", error);
      // setShowMessage(true);
      // handle login error, e.g., show an error message
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-4">
      {/* {showMessage && (
          <div className="alert alert-danger show text-center" role="alert">
            Email and password do not match, One or both are incorrect!
          </div>
        )} */}
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
