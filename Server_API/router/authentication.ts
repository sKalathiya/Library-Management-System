import express from 'express';

import {isAuthenticated} from '../middlewares';
import { registerUser } from '../controllers/authentication';


export default (router: express.Router) => {
    router.post("/registerUser", registerUser);
}

