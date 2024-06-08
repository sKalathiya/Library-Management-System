import express from 'express';
import {isAuthenticated, isBookkeeper, isOwner} from '../middlewares';
import { deleteUser, getUserById, getUsers, getUsersByFilter, updateUser } from '../controllers/user';


export default (router: express.Router) => {
    router.get("/user",isAuthenticated, isBookkeeper, getUsers);
    router.get("/user/filter",isAuthenticated, isBookkeeper, getUsersByFilter);
    router.get("/user/:id", isAuthenticated, isBookkeeper, getUserById);
    router.get("/myProfile/:id", isAuthenticated, isOwner, getUserById);
    router.delete("/myProfile/:id", isAuthenticated, isOwner, deleteUser);
    router.post("/myProfile/update/:id", isAuthenticated, isOwner, updateUser);
}

