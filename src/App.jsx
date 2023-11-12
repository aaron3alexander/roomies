import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAuthenticatedUser(foundUser);
    }
  }, []); // <-- The empty dependency array ensures this effect runs only once
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />}></Route>
        <Route path="/" element={<LoginPage setAuthenticatedUser={setAuthenticatedUser} />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
