import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en"; // import the locale you need

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SignUp() {
  dayjs.tz.setDefault("America/Chicago");
  //Menu
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 6,
        width: 250,
      },
    },
  };
  const academicDisciplines = [
    { label: "Accounting" },
    { label: "Acting" },
    { label: "Advertising" },
    { label: "Aerospace Engineering" },
    { label: "African and African Diaspora Studies" },
    { label: "American Studies" },
    { label: "Ancient History" },
    { label: "Anthropology" },
    { label: "Applied Movement Science" },
    { label: "Architectural Engineering" },
    { label: "Architectural Studies" },
    { label: "Architecture" },
    { label: "Art Education" },
    { label: "Art History" },
    { label: "Arts and Entertainment Technologies" },
    { label: "Asian Cultures and Languages" },
    { label: "Asian Studies" },
    { label: "Astronomy" },
    { label: "Athletic Training" },
    { label: "Biochemistry" },
    { label: "Biology" },
    { label: "Biomedical Engineering" },
    { label: "Business Administration" },
    { label: "Business Analytics" },
    { label: "Business Honors Program" },
    { label: "Chemical Engineering" },
    { label: "Chemistry" },
    { label: "Chinese" },
    { label: "Civil Engineering" },
    { label: "Classical Archaeology" },
    { label: "Classical Languages" },
    { label: "Classical Studies" },
    { label: "Classics" },
    { label: "Communication and Leadership" },
    { label: "Communication Studies" },
    { label: "Computational Engineering" },
    { label: "Computer Science" },
    { label: "Dance" },
    { label: "Dance Education" },
    { label: "Design" },
    { label: "Economics" },
    { label: "Education" },
    { label: "Electrical and Computer Engineering" },
    { label: "English" },
    { label: "Environmental Engineering" },
    { label: "Environmental Science" },
    { label: "Ethnic Studies" },
    { label: "European Studies" },
    { label: "Exercise Science" },
    { label: "Finance" },
    { label: "French Studies" },
    { label: "General Geology" },
    { label: "Geography" },
    { label: "Geological Sciences" },
    { label: "Geophysics" },
    { label: "Geosystems Engineering and Hydrogeology" },
    { label: "German" },
    { label: "Government" },
    { label: "Greek" },
    { label: "Health & Society" },
    { label: "Health Promotion and Behavioral Science" },
    { label: "Hindi/Urdu" },
    { label: "History" },
    { label: "Human Development and Family Sciences" },
    { label: "Human Dimensions of Organizations" },
    { label: "Human Ecology" },
    { label: "Humanities" },
    { label: "Hydrogeology" },
    { label: "Informatics" },
    { label: "Interior Design" },
    { label: "International Business" },
    { label: "International Relations and Global Studies" },
    { label: "Italian" },
    { label: "Japanese" },
    { label: "Jazz" },
    { label: "Jewish Studies" },
    { label: "Journalism" },
    { label: "Korean" },
    { label: "Latin" },
    { label: "Latin American Studies" },
    { label: "Linguistics" },
    { label: "Malayalam" },
    { label: "Management" },
    { label: "Management Information Systems" },
    { label: "Marketing" },
    { label: "Mathematics" },
    { label: "Mechanical Engineering" },
    { label: "Medical Laboratory Science" },
    { label: "Middle Eastern Studies" },
    { label: "Music" },
    { label: "Music Composition" },
    { label: "Music Performance" },
    { label: "Music Studies" },
    { label: "Neuroscience" },
    { label: "Nursing" },
    { label: "Nutrition" },
    { label: "Petroleum Engineering" },
    { label: "Pharmacy" },
    { label: "Philosophy" },
    { label: "Physical Culture and Sports" },
    { label: "Physics" },
    { label: "Plan II Honors Program" },
    { label: "Portuguese" },
    { label: "Pre-Pharmacy" },
    { label: "Psychology" },
    { label: "Public Health" },
    { label: "Public Relations" },
    { label: "Race, Indigeneity, and Migration" },
    { label: "Radio-Television-Film" },
    { label: "Religious Studies" },
    { label: "Rhetoric and Writing" },
    { label: "Russian, East European and Eurasian Studies" },
    { label: "Sanskrit" },
    { label: "Science and Technology Management" },
    { label: "Social Work" },
    { label: "Sociology" },
    { label: "Spanish" },
    { label: "Speech, Language, and Hearing Sciences" },
    { label: "Sport Management" },
    { label: "Statistics and Data Science" },
    { label: "Studio Art" },
    { label: "Supply Chain Management" },
    { label: "Sustainability Studies" },
    { label: "Tamil" },
    { label: "Textiles and Apparel" },
    { label: "Theatre and Dance" },
    { label: "Theatre Education" },
    { label: "Undeclared (Communication)" },
    { label: "Undeclared (Liberal Arts)" },
    { label: "Undeclared (Natural Sciences)" },
    { label: "Urban Studies" },
    { label: "Women’s and Gender Studies" },
    { label: "Youth and Community Studies" },
  ];
  const cost = [
    {
      value: 500,
      label: "$500",
    },
    {
      value: 2000,
      label: "$2000",
    },
  ];
  const guests = [
    {
      value: 1,
      label: "Quite Rare",
    },
    {
      value: 2,
      label: "Rare",
    },
    {
      value: 3,
      label: "Occasionally",
    },
    {
      value: 4,
      label: "Frequently",
    },
    {
      value: 5,
      label: "Quite Often",
    },
  ];
  const [step, setStep] = useState(0);
  // const [showMessage, setShowMessage] = useState(false);
  //Our allergy options
  const allAllergies = ["Nuts", "Fish", "Dairy", "Veat", "Gluten"];
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [wake, setWake] = useState(dayjs(""));
  const [sleep, setSleep] = useState(dayjs(""));
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [targetGender, setTargetGender] = useState("");
  const [personality, setPersonality] = useState("");
  const [noise, setNoise] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [company, setCompany] = useState(1);
  const [share, setShare] = useState(true);
  const [budget, setBudget] = useState();
  const [pets, setPets] = useState(true);
  const [major, setMajor] = useState();
  const [clean, setClean] = useState();
  const [bio, setBio] = useState();
  const [drive, setDrive] = useState();

  const handleSleepChange = (newSleepTime) => {
    setSleep(newSleepTime);
  };
  const handleWakeChange = (newWakeTime) => {
    setWake(newWakeTime);
  };
  // handle multiple allergies
  const handleAllergies = (event) => {
    const {
      target: { value },
    } = event;
    setAllergies(typeof value === "string" ? value.split(",") : value);
  };
  //Handle signup multiple "pages"
  const handleNext = () => {
    // Increment the step to show the next set of preferences
    setStep((prevStep) => prevStep + 1);
  };
  //handle back to previous "pages"
  const handleBack = () => {
    // Increment the step to show the next set of preferences
    setStep((prevStep) => prevStep - 1);
  };
  // const { errors } = formState;//checking for errors
  const handleSignup = async () => {
    // Implement your Signup logic here
    const data = {
      fname: fName,
      lname: lName,
      phone: phone,
      email: email,
      age: age,
      gender: gender,
      major: major,
      targetGender: targetGender,
      wakeTime: wake,
      sleepTime: sleep,
      personality: personality,
      noiseLevel: noise,
      allergies: allergies,
      guestPolicy: company,
      sharing: share,
      monthlyBudget: budget,
      pets: pets,
      cleanliness: clean,
      bio: bio,
      pfp: drive,
    };
    console.log(data);
    try {
      const response = await axios.post("http://localhost:4000/register", data); //sends data to db
      console.log("Basic data Registered Successfully");
      response = await axios.post("http://localhost:4000/preferences", data); //sends data to db
      console.log("Preferences Registered Successfully");
      // setShowForm(false); //hides form and shows validation for registering
    } catch (error) {
      // if (error.response.status == 400) {
      //   setShowMessage(true); //tells user email is already being used
      // }
      console.log(error.response);
      console.log("Error registering user:", error);
    }
    console.log(
      `Signing up with Email: ${email},
      Password: ${password},
      First Name: ${fName},
      Last Name: ${lName},
      Phone: ${phone},
      Age: ${age},
      Gender: ${gender},
      Major: ${major},
      Target Gender: ${targetGender},
      Wake up Time: ${wake},
      Sleep Time: ${sleep},
      Personality: ${personality},
      How Noisy: ${noise},
      Allergies: ${allergies},
      Company Often? ${company},
      Like to share? ${share},
      Max Rent: ${budget},
      Live with pets? ${pets},
      `
    );
  };

  //Used to debugg
  //   useEffect(() => {
  //     console.log(wake)
  //     console.log(sleep)
  // }, [wake, sleep])

  return (
    <div className="w-full  h-screen flex flex-col justify-evenly items-center p-4">
      {/* {showMessage && (
        <div class="alert alert-danger show text-center" role="alert">
          This email is aleady being used! Please try a different email!
        </div>
      )} */}
      <h1 className="text-4xl font-display">Sign Up</h1>
      <div className="h-fit w-fit rounded-lg flex flex-col items-center space-y-4">
        <form className="">
          {step === 0 && (
            <div className=" flex flex-col px-4  items-center space-y-4">
              {/* Basic  */}
              <TextField
                required
                id="fName"
                label="First Name"
                value={fName}
                onChange={(e) => setfName(e.target.value)}
              />
              <TextField
                required
                id="lName"
                label="Last Name"
                value={lName}
                onChange={(e) => setlName(e.target.value)}
              />
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
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* Major */}
              <div>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={academicDisciplines}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                    />
                  )}
                />
              </div>
              {/* Gender */}
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"O"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              {/* Age */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              {/* Preference to live with */}
              <div>
                {/* pets */}
                <div>
                  Are you willing to live with pets?
                  <Switch
                    value={pets}
                    onChange={() => {
                      setShare(!pets);
                    }}
                    defaultChecked
                  />
                </div>
                {/* Prefered Gender */}
                What Gender do you prefer to live with?
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={targetGender}
                      label="Preference"
                      onChange={(e) => setTargetGender(e.target.value)}
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"O"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              {/* Sleep Schedule */}
              <div>
                I go to sleep around
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    views={["hours"]}
                    label="Sleep?"
                    value={sleep}
                    onChange={handleSleepChange}
                  />
                </LocalizationProvider>
                and wake up around
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    views={["hours"]}
                    label="Wake?"
                    value={wake}
                    onChange={handleWakeChange}
                  />
                </LocalizationProvider>
              </div>
              {/* Personality */}
              <div>
                How would you rate your personality?
                <ToggleButtonGroup
                  value={personality}
                  exclusive
                  onChange={(e) => setPersonality(e.target.value)}
                >
                  <ToggleButton value="Introvert">Introvert</ToggleButton>
                  <ToggleButton value="Ambivert">Ambivert</ToggleButton>
                  <ToggleButton value="Extrovert">Extrovert</ToggleButton>
                </ToggleButtonGroup>
              </div>
              {/* Loud? */}
              <div>
                How would you describe your average noise level?
                <ToggleButtonGroup
                  value={noise}
                  exclusive
                  onChange={(e) => setNoise(e.target.value)}
                >
                  <ToggleButton value="Quiet">Quiet</ToggleButton>
                  <ToggleButton value="Moderate">Moderate</ToggleButton>
                  <ToggleButton value="Loud">Loud</ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              {/* Allergies */}
              <div>
                Do you have any allergies?
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={allergies}
                    onChange={handleAllergies}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {allAllergies.map((allergy) => (
                      <MenuItem key={allergy} value={allergy}>
                        <Checkbox checked={allergies.indexOf(allergy) > -1} />
                        <ListItemText primary={allergy} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* Company? */}
              <div>
                Do you have company often?
                <Box sx={{ width: 300 }}>
                  <Slider
                    value={company}
                    defaultValue={3}
                    max={5}
                    min={1}
                    step={1}
                    marks={guests}
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  />
                </Box>
              </div>
              {/* Like to Share? */}
              <div>
                Are you open to sharing?
                <Switch
                  value={share}
                  onChange={() => {
                    setShare(!share);
                  }}
                  defaultChecked
                />
              </div>
              {/* Budget */}
              <div>
                What is your maximum rent cost?
                <Box sx={{ width: 300 }}>
                  <Slider
                    value={budget}
                    defaultValue={1000}
                    max={2000}
                    min={500}
                    valueLabelDisplay="on"
                    marks={cost}
                    onChange={(e) => {
                      setBudget(e.target.value);
                    }}
                  />
                </Box>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p>Bio</p>
              <TextField
                id="bio"
                label="Talk about yourself..."
                variant="outlined"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <p>Please Enter Drive link:</p>
              <TextField
                id="drive"
                label="Drive Link"
                variant="outlined"
                type="text"
                value={drive}
                onChange={(e) => setDrive(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignup()}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </form>
        <div className="flex space-x-4">
          <Link className="underline" to={"/"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
