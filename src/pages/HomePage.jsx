import Navbar from "../components/navbar";
import TinderCard from "react-tinder-card";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";
import HotelIcon from "@mui/icons-material/Hotel";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "../index.css";

import { useEffect, useState } from "react";

export default function HomePage({ authenticatedUser, setAuthenticatedUser }) {
  const db = [
    {
      fname: "Tubs",
      lname: "Tubberson",
      compatibilityScore: 55,
      major: "Math",
      university: "University of North Texas",
      age: 18,
      description:
        "Hi name is Tubby Tubberson, but my friends call me Tubs. I am a considerate roommate and I sleep early.",
      photo:
        "https://drive.google.com/file/d/16Bp8vYfiP3ptMWsC1zDO2JlYHxgvnpxm/view?usp=sharing",
      preferences: {
        sleepTime: 21,
        wakeTime: 7,
        allergies: [],
        guestPolicy: "0",
        personality: "Introvert",
        pets: false,
        noiseLevel: "Quiet",
        sharing: false,
        monthlyBudget: 700,
        gender: "Male",
      },
      gender: "Male",

      phone: "5555555555",
    },
    {
      fname: "Ronny",
      lname: "Lobvouski",
      compatibilityScore: 74,
      major: "Philosophy",
      university: "University of North Texas",
      age: 22,
      description: "Fun-loving guy. Open to anything",
      photo:
        "https://drive.google.com/file/d/1EyIdXgd1DgNQumGf-4fHmGNS-72ZY03Q/view?usp=sharing",
      preferences: {
        sleepTime: 3,
        wakeTime: 13,
        allergies: [],
        guestPolicy: "0",
        personality: "Extrovert",
        pets: true,
        noiseLevel: "Loud",
        sharing: true,
        monthlyBudget: 900,
        gender: "Male",
      },
      gender: "Male",

      phone: "5555555555",
    },
    {
      fname: "Mike",
      lname: "Wazowski",
      compatibilityScore: 89,
      major: "Creative Arts",
      university: "University of North Texas",
      age: 22,
      description:
        "I love Hansen the hardware hippo. Pingpong enthusiast. Very clean.",
      photo:
        "https://drive.google.com/file/d/1u1s-XNJpsNlZfklGyYMC2j-3MrnYF0Ht/view?usp=sharing",
      preferences: {
        sleepTime: 1,
        wakeTime: 8,
        allergies: [],
        guestPolicy: "0",
        personality: "Extrovert",
        pets: true,
        noiseLevel: "Loud",
        sharing: true,
        monthlyBudget: 1500,
      },
      gender: "Male",

      phone: "5555555555",
    },
    {
      fname: "Jake",
      lname: "Pinestar",
      compatibilityScore: 96,
      major: "Computer Science",
      university: "University of North Texas",
      age: 19,
      description:
        "Hi name is Jake and I'm super chill. I am a considerate roommate and I sleep early. I hate animals, but I love people!",
      photo:
        "https://drive.google.com/file/d/1jLIy50-O9qWwnmKhzhaVfEGHrhLwvaIf/view?usp=sharing",
      preferences: {
        sleepTime: 22,
        wakeTime: 9,
        allergies: [],
        guestPolicy: "0",
        personality: "Extrovert",
        pets: false,
        noiseLevel: "Quiet",
        sharing: false,
        monthlyBudget: 1200,
        gender: "Male",
      },
      gender: "Male",
      phone: "5555555555",
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
    <div className="homepagediv">
      <Navbar
        authenticatedUser={authenticatedUser}
        setAuthenticatedUser={setAuthenticatedUser}
      />

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
                    <p className="mt-1 text-sm text-center">
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
                    <p className="mt-1 text-sm text-center">
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
                    <p className="mt-1 text-sm text-center">
                      You and {person.fname} would not be good roommates.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-green-100 border-green-800 border-2 rounded-lg p-2">
              <h1 className="text-4xl font-display mb-1 lowercase overflow-hidden">
                {person.fname}, {person.age}, {person.gender}
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
              <div className="">
                <div className="flex items-center">
                  <HotelIcon />
                  <h1 className="ml-2">
                    Sleeps at{" "}
                    {person.preferences.sleepTime > 12
                      ? `${person.preferences.sleepTime % 12} PM`
                      : `${person.preferences.sleepTime} AM`}
                  </h1>
                </div>

                <div className="flex items-center">
                  <WbSunnyIcon />
                  <h1 className="ml-2">
                    Wakes up at{" "}
                    {person.preferences.wakeTime > 12
                      ? `${person.preferences.wakeTime % 12} PM`
                      : `${person.preferences.wakeTime} AM`}
                  </h1>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  <MonetizationOnIcon />
                  <h1>Budget: ${person.preferences.monthlyBudget}</h1>
                </div>

                <h1>Personality: {person.preferences.personality}</h1>
                <h1>Noise Level: {person.preferences.noiseLevel}</h1>

                {person.preferences.pets ? (
                  <h1>Open to pets</h1>
                ) : (
                  <h1>Against having pets</h1>
                )}

                {person.preferences.sharing ? (
                  <h1>Down to share items</h1>
                ) : (
                  <h1>Against sharing items</h1>
                )}
              </div>
            </div>

            <div className="cardContainer"></div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
