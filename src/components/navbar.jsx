import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const Signout = () => {
    console.log("hey");
    navigate("/login");
  };
  return (
    <div className="h-fit w-full flex bg-green-500 justify-between p-4">
      <h1 className="text-white font-display text-2xl overflow-hidden">
        Roomie
      </h1>
      <button
        className="w-24 h-8 bg-white rounded-md font-display"
        onClick={Signout}
      >
        Sign Out
      </button>
    </div>
  );
}
