import express from 'express';

import {isAuthenticated, isOwner} from '../middlewares';
import { loginUser, logoutUser, registerUser, updateAuth } from '../controllers/authentication';


export default (router: express.Router) => {
    router.post("/register", registerUser);
    router.post("/login",loginUser);
    router.get("/logout", isAuthenticated, logoutUser);
    router.post("/updatePassword/:id", isAuthenticated, isOwner, updateAuth);
}

