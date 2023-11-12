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
    console.log('Connected to your Dylan database');
})
.catch((err) => {
    console.log('Error connecting to database:', err);
});

// Define the User Schema
const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    preferences: {
        sleepTime: Number, // [0, 23]
        wakeTime: Number, // [0, 23]
        allergies: [String],
        guestPolicy: String, // "Never", "Sometimes", "Often"
        major: String,
        personality: String, // "Let's be BFFs!", "Open to hang", "Leave me alone and I'll leave you alone"
        pets: String, // "Yes", "No"
        noiseLevel: String, // "Quiet", "Moderate", "Loud"
        cleanliness: String, // "Clean", "Moderate", "Messy"
        sharing: String, // "What's mine is yours", "Ask first", "Don't touch my stuff"
        monthlyBudget: Number,
    }
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
  if (preference === "sleepTime") {
    return Math.min(Math.abs(a - b), 24 - Math.abs(a - b));
  } else if (preference === "wakeTime") {
    return Math.min(Math.abs(a - b), 24 - Math.abs(a - b));
  } else if (preference === "allergies") {
    let bigger = a.length > b.length ? a : b;
    let smaller = a.length <= b.length? a : b;
    return bigger.filter((x) => smaller.includes(x)).length / bigger.length;
  }
  return 0.5;
}

function distance(alice, bob) {
  if (alice.gender !== bob.gender) {
    return Infinity;
  }
  let sum = 0;
  for (const preference in alice.preferences) {
    sum += Math.pow(preferencesToDistance(alice, bob, preference), 2);
  }
  return Math.sqrt(sum);
}

async function knn(email) {
  const user = await User.find({ email: email });
  const neighbors = await User.find({ email: { $ne: email } });
  return neighbors
    .sort((a, b) => distance(user, a) - distance(user, b))
    .filter((neighbor) => distance(user, neighbor) !== Infinity);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
