import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import "dotenv/config";

const app = express();
const port = 4000;

// Connect to MongoDB
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
.then(() => {
    console.log('Connected to your roomies database');
})
.catch((err) => {
    console.log('Error connecting to database:', err);
});

// Define the User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    profile: {
        bio: String,
        pfp: String,
        gender: String,
    },
    preferences: {
        age: Number, // [18, 30]
        targetGender: String, // "Male", "Female"
        sleepTime: Number, // [0, 23]
        wakeTime: Number, // [0, 23]
        allergies: [String],
        guestPolicy: Number, // [1, 5]
        major: String,
        personality: String, // "Introvert", "Ambivert", "Extrovert"
        pets: Boolean,
        noiseLevel: String, // "Quiet", "Moderate", "Loud"
        cleanliness: String, // "Clean", "Moderate", "Messy"
        sharing: Boolean,
        monthlyBudget: Number, // [500, 2000]
    },
    likes: [String],
    dislikes: [String],
    matches: [String],
});

// Add a method to the UserSchema for comparing passwords
UserSchema.methods.comparePassword = function (password) {
    return password === this.password;
};

// Create User model
const User = mongoose.model('user', UserSchema);

// Middleware to parse JSON
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the actual domain of your frontend
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Handle pre-flight requests
app.options('*', cors(corsOptions));
app.use(express.json());

// Setup express-session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // using 'email' as the username field in the login form
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !user.comparePassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        console.log(user, "random string");
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Middleware to check if the user is authenticated
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User not logged in' });
};

// API endpoint for user registration
app.post('/register', async (req, res) => {
    try {
        const { fname, lname, phone, email, password, id } = req.body;

        // Create new user
        const newUser = new User({ fname, lname, phone, email, password, id });
        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
                console.error('Error logging in after registration:', err);
                return res.status(500).json({ message: 'Something went wrong' });
            }

            // Return the user object
            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        });
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// API endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// API endpoint for user logout
app.get('/logout', (req, res) => {
    // Check if the user is authenticated before attempting to logout
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        // Logout the user by destroying the session
        req.logout();
        // Send a success response
        res.status(200).json({ message: 'Logout successful' });
    } else {
        // If the user is not authenticated, send an error response
        res.status(401).json({ message: 'Not authenticated' });
    }
});

//API endpoint to get one user
app.post('/user', async (req, res) => {
    try {
        console.log(req.body.email, 'some string');
        // console.log(req.email);
        if (req.body.email) {
            const user = await User.findOne({"email":req.body.email});
            res.json(user);
          }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// API endpoint to get the current user
app.get('/users/current', isLoggedIn, (req, res) => {
    res.status(200).json(req.user);
});

// API endpoint for user login
app.post('/login', passport.authenticate('local'), (req, res) => {
     // If the authentication is successful, the user will be available in req.user
    // Set the user as authenticated in the session
    req.login(req.user, (err) => {
        if (err) {
            console.error('Error logging in after authentication:', err);
            return res.status(500).json({ message: 'Something went wrong' });
        }
        console.log(req.isAuthenticated())
        const session = {...req.user};
        // setLoginSession(res, session);
        // Send a success response
        res.status(200).json({ message: 'Login successful', user: req.user });
    });
});

function preferencesToDistance(alice, bob, preference) {
  const a = alice.preferences[preference];
  const b = bob.preferences[preference];
  if (preference === "gender") {
    return a === b ? 0 : Infinity;
  } else if (preference === "age") {
    return Math.abs(a - b) / 22;
  } else if (preference === "sleepTime") {
    return Math.min(Math.abs(a - b), 24 - Math.abs(a - b));
  } else if (preference === "wakeTime") {
    return Math.min(Math.abs(a - b), 24 - Math.abs(a - b));
  } else if (preference === "allergies") {
    let bigger = a.length > b.length ? a : b;
    let smaller = a.length <= b.length? a : b;
    if (bigger.length === 0) {
      return 0;
    }
    return bigger.filter((x) => smaller.includes(x)).length / bigger.length;
  } else if (preference === "guestPolicy") {
    return Math.abs(a - b) / 4;
  } else if (preference === "major") {
    return a === b ? 0 : 1;
  } else if (preference === "personality") {
    const personalities = ["Introvert", "Ambivert", "Extrovert"];
    return Math.abs(personalities.indexOf(a) - personalities.indexOf(b)) / (personalities.length - 1);
  } else if (preference === "pets") {
    return a === b ? 0 : 1;
  } else if (preference === "noiseLevel") {
    const noiseLevels = ["Quiet", "Moderate", "Loud"];
    return Math.abs(noiseLevels.indexOf(a) - noiseLevels.indexOf(b)) / (noiseLevels.length - 1);
  } else if (preference === "cleanliness") {
    const cleanlinessLevels = ["Clean", "Moderate", "Messy"];
    return Math.abs(cleanlinessLevels.indexOf(a) - cleanlinessLevels.indexOf(b)) / (cleanlinessLevels.length - 1);
  } else if (preference === "sharing") {
    return a === b ? 0 : 1;
  } else if (preference === 'monthlyBudget') {
    return Math.abs(a - b) / 1500;
  }
  return 0.5;
}

function distance(alice, bob) {
  let sum = 0;
  for (const preference of Object.keys(alice.preferences)) {
    sum += Math.pow(preferencesToDistance(alice, bob, preference), 2);
  }
  return Math.sqrt(sum);
}

async function knn(email) {
  const user = await User.findOne({ email: email });
  const neighbors = await User.find({ $and: [
    { email: { $ne: email } },
    { email: { $nin: user.matches }},
    { email: { $nin: user.likes }},
    { email: { $nin: user.dislikes }},
  ]});
  return neighbors
    .sort((a, b) => distance(user, a) - distance(user, b))
    .filter((neighbor) => distance(user, neighbor) !== Infinity)
    .map((neighbor) => ({ email: neighbor.email, distance: distance(user, neighbor) }));
}

app.get('/knn', async (req, res) => {
  try {
    const neighbors = await knn(req.query.email);
    res.json(neighbors);
  } catch (error) {
    console.error('Error getting neighbors:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

async function getUser(email) {
    return await User.findOne({ email });
}

app.get('/user/:email', async (req, res) => {
    try {
        const user = await getUser(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

async function updateProfile(email, data) {
    const user = await User.findOne({ email });
    for (const profile of Object.keys(data)) {
        user.profile[profile] = data[profile];
    }
    await user.save();
}

app.post('/profile', async (req, res) => {
    try {
        await updateProfile(req.body.email, req.body.data);
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

async function updatePreferences(email, data) {
    const user = await User.findOne({ email });
    for (const preference of Object.keys(data)) {
        user.preferences[preference] = data[preference];
    }
    await user.save();
}

app.post('/preferences', async (req, res) => {
    try {
        await updatePreferences(req.body.email, req.body.data);
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post("/swipe", async (req, res) => {
  try {
    const swipee = await User.findOne({ email: req.body.swipee });
    const swiper = await User.findOne({ email: req.body.swiper });
    if (req.body.swipedRight) {
      if (swipee.likes.includes(req.body.swiper)) {
        swipee.matches.push(req.body.swiper);
        swipee.likes = swipee.likes.filter((email) => email !== req.body.swiper);
        swiper.matches.push(req.body.swipee);
      } else {
        swiper.likes.push(req.body.swipee);
      }
    } else {
      swiper.dislikes.push(req.body.swipee);
    }
    await swipee.save();
    await swiper.save();
    res.json({ message: "Swiped successfully" });
  } catch (error) {
    console.error("Error swiping:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
