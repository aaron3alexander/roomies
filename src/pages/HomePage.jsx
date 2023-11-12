import Navbar from "../components/navbar";
import TinderCard from "react-tinder-card";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";
import "../index.css";

import { useState } from "react";

export default function HomePage() {
  const db = [
    {
      fname: "Tubs",
      lname: "Tubberson",
      compatibilityScore: 90,
      major: "Computer Science",
      university: "University of North Texas",
      age: 19,
      description:
        "Hi name is Tubby Tubberson, but my friends call me Tubs. I am very tubbylicious. I am a considerate roommate and I sleep early.",
      photo:
        "https://drive.google.com/file/d/16Bp8vYfiP3ptMWsC1zDO2JlYHxgvnpxm/view?usp=sharing",
    },
    {
      fname: "RON",
      lname: "SWANSON",
      compatibilityScore: 90,
      major: "Computer Science",
      university: "University of North Texas",
      age: 19,
      description: "",
      photo:
        "https://drive.google.com/file/d/1EyIdXgd1DgNQumGf-4fHmGNS-72ZY03Q/view?usp=sharing",
    },
    {
      fname: "Jake",
      lname: "Pinestar",
      compatibilityScore: 90,
      major: "Computer Science",
      university: "University of North Texas",
      age: 19,
      description:
        "Hi name is Tubby Tubberson, but my friends call me Tubs. I am very tubbylicious. I am a considerate roommate and I sleep early.",
      photo:
        "https://drive.google.com/file/d/1jLIy50-O9qWwnmKhzhaVfEGHrhLwvaIf/view?usp=sharing",
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="">
      <Navbar />

      {db.map((person) => (
        <TinderCard
          className="absolute"
          key={person.name}
          onSwipe={(dir) => swiped(dir, person.name)}
          onCardLeftScreen={() => outOfFrame(person.name)}
        >
          <div className="w-full mt-2 h-full flex flex-col space-y-4 relative bg-white shadow-lg">
            <div className="flex justify-evenly p-2 w-full h-64 space-x-4">
              <div className="h-full w-1/2 border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={
                    "https://drive.google.com/thumbnail?id=" +
                    person.photo.match(/\/file\/d\/([^\/]+)\//)[1]
                  }
                />
              </div>

              <div className="h-full flex flex-col items-center justify-center">
                <h1 className="font-display text-2xl mb-2 text-center overflow-hidden">
                  {person.fname} {person.lname}
                </h1>
                {person.compatibilityScore >= 90 ? (
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-32 w-32 bg-green-500 flex justify-center items-center disable-scroll">
                      <h1 className="text-6xl text-white font-bold overflow-hidden">
                        {person.compatibilityScore}
                      </h1>
                    </div>
                    <p className="mt-1 text-sm text-center">
                      You and {person.fname} are super compatible!
                    </p>
                  </div>
                ) : person.compatibilityScore >= 80 ? (
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-32 w-32 bg-teal-500 flex justify-center items-center">
                      <h1 className="text-6xl text-white font-bold disable-scroll">
                        {person.compatibilityScore}
                      </h1>
                    </div>
                    <p className="mt-1 text-sm">
                      You and {person.fname} would make good roommates!
                    </p>
                  </div>
                ) : person.compatibilityScore >= 70 ? (
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-32 w-32 bg-yellow-500 flex justify-center items-center">
                      <h1 className="text-6xl text-white font-bold disable-scroll">
                        {person.compatibilityScore}
                      </h1>
                    </div>
                    <p className="mt-1 text-sm">
                      You and {person.fname} are compatible with each other.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-32 w-32 bg-red-500 flex justify-center items-center">
                      <h1 className="text-6xl text-white font-bold disable-scroll">
                        {person.compatibilityScore}
                      </h1>
                    </div>
                    <p className="mt-1 text-sm">
                      You and {person.fname} would not be good roommates.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-green-100 border-green-800 border-2 rounded-lg p-2">
              <h1 className="text-4xl font-display mb-1 lowercase overflow-hidden">
                {person.fname}, {person.age}
              </h1>
              <div className="flex items-center">
                <LaptopChromebookIcon />
                <p className="ml-2 mb-1">{person.major} Major</p>
              </div>

              <div className="flex items-center">
                <SchoolIcon />
                <p className="ml-2 mb-1">{person.university}</p>
              </div>
              <div className="mt-4">
                <h1 className="text-xl font-display lowercase underline">
                  About Me
                </h1>
                <p>{person.description}</p>
              </div>
            </div>

            <div className="bg-green-100 border-green-800 border-2 rounded-lg p-2">
              <h1 className="text-4xl font-display mb-1 lowercase overflow-hidden">
                preferences
              </h1>
              <div className="flex items-center"></div>

              <div className="flex items-center"></div>
              <div className="mt-4">
                <h1 className="text-xl font-display lowercase underline">
                  About Me
                </h1>
                <p>{person.description}</p>
              </div>
            </div>

            <div className="cardContainer"></div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
