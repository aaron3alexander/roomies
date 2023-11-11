import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies.js' //for encryption (not used at the moment)
import { ObjectSchema } from 'yup';

const app = express();
const port = 4000;

// const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters"; //for encryption (do not uncomment unless working on encryption)

// Connect to MongoDB
const uri = "mongodb+srv://Roomies:hitbxUCZLGLPXi9E@cluster0.rcurpru.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to your Dylan database');
})
.catch((err) => {
    console.log('Error connecting to database:', err);
});

