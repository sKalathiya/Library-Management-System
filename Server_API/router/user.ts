import express from 'express';
import {isAuthenticated} from '../middlewares';
import { deleteUser, getUserById, getUsers, getUsersByFilter, updateUser } from '../controllers/user';


export default (router: express.Router) => {
    router.get("/user", getUsers);
    router.get("/user/filter", getUsersByFilter);
    router.get("/user/:id", getUserById);
    router.delete("/user/:id", deleteUser);
    router.post("/user/update/:id", updateUser);
}

