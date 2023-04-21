import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { setRefreshTokenCookie } from '../utils/helper.js';

/* 
@description Register a new user
@route POST /api/users
@access public
*/
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email }) // find the one user with the matching email

    if (existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
    });

    if (user) { // if user is created successfully
        const accessToken = generateAccessToken(user._id)

        // add refreshToken to db
        const refreshToken = generateRefreshToken(user._id)
        user.refreshToken = refreshToken
        
        console.log("checkpoint")
        
        // pass refresh token as a response cookie
        setRefreshTokenCookie(res, refreshToken)
        // res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true})
        await user.save()
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/* 
@description Authenticate user and get token
@route POST /api/users/login
@access public
*/
export const authenticateUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) // find the one user with the matching email

    if (user && (await user.matchPassword(password))) {
        const accessToken = generateAccessToken(user._id)

        // add refreshToken to db
        const refreshToken = generateRefreshToken(user._id)
        user.refreshToken = refreshToken
        // pass refresh token as a response cookie
        setRefreshTokenCookie(res, refreshToken)
        // res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true})
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});