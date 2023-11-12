import Navbar from "../components/navbar";
import TinderCard from "react-tinder-card";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";

export default function HomePage() {
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const data = {
    fname: "Tubby",
    lname: "Tubberson",
    compatibilityScore: 90,
    major: "Computer Science",
    university: "University of North Texas",
    age: 19,
    description:
      "Hi name is Tubby Tubberson, but my friends call me Tubs. I am very tubbylicious. I am a considerate roommate and I sleep early.",
    photo:
      "https://drive.google.com/file/d/16Bp8vYfiP3ptMWsC1zDO2JlYHxgvnpxm/view?usp=sharing",
  };

  const match =
    "https://drive.google.com/thumbnail?id=" +
    data.photo.match(/\/file\/d\/([^\/]+)\//)[1];

  return (
    <div className="">
      <Navbar />
      <div className="w-full mt-2 h-full flex flex-col space-y-4">
        <div className="flex justify-evenly p-2 w-full h-64 space-x-4">
          <div className="h-full w-1/2 border-2 border-black">
            <img className="h-full w-full object-cover" src={match} />
          </div>

          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="font-display text-2xl mb-2 text-center">{`${data.fname} ${data.lname}`}</h1>
            {data.compatibilityScore >= 90 ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full h-32 w-32 bg-green-500 flex justify-center items-center">
                  <h1 className="text-6xl text-white font-bold">
                    {data.compatibilityScore}
                  </h1>
                </div>
                <p className="mt-1 text-sm text-center">
                  You and {data.fname} are super compatible!
                </p>
              </div>
            ) : data.compatibilityScore >= 80 ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full h-32 w-32 bg-teal-500 flex justify-center items-center">
                  <h1 className="text-6xl text-white font-bold">
                    {data.compatibilityScore}
                  </h1>
                </div>
                <p className="mt-1 text-sm">
                  You and {data.fname} would make good roommates!
                </p>
              </div>
            ) : data.compatibilityScore >= 70 ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full h-32 w-32 bg-yellow-500 flex justify-center items-center">
                  <h1 className="text-6xl text-white font-bold">
                    {data.compatibilityScore}
                  </h1>
                </div>
                <p className="mt-1 text-sm">
                  You and {data.fname} are compatible with each other.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="rounded-full h-32 w-32 bg-red-500 flex justify-center items-center">
                  <h1 className="text-6xl text-white font-bold">
                    {data.compatibilityScore}
                  </h1>
                </div>
                <p className="mt-1 text-sm">
                  You and {data.fname} would not be good roommates.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-100 border-green-800 border-2 rounded-lg p-2">
          <h1 className="text-4xl font-display mb-1 lowercase">
            {data.fname}, {data.age}
          </h1>
          <div className="flex items-center">
            <LaptopChromebookIcon />
            <p className="ml-2 mb-1">{data.major} Major</p>
          </div>

          <div className="flex items-center">
            <SchoolIcon />
            <p className="ml-2 mb-1">{data.university}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-display lowercase underline">
              About Me
            </h1>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="bg-green-100 border-green-800 border-2 rounded-lg p-2">
          <h1 className="text-4xl font-display mb-1 lowercase">preferences</h1>
          <div className="flex items-center"></div>

          <div className="flex items-center"></div>
          <div className="mt-4">
            <h1 className="text-xl font-display lowercase underline">
              About Me
            </h1>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
