import express from "express";
import {get, identity, merge} from 'lodash';
import { getAuthenticationBySession_Action } from "../db/actions/authenticationActions";
import { getUserById } from "../controllers/user";
import { getUserById_Action } from "../db/actions/userActions";

//checks if authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // getting session from cookie
        const sessionToken = req.cookies["auth"];
        //if no session available
        if( !sessionToken){
            return res.sendStatus(401);
        }

        //finding user
        const auth = await getAuthenticationBySession_Action(sessionToken);

        if( !auth){
            return res.sendStatus(400);
        }
        const user = await getUserById_Action(auth.userId);
        //adding user to req
        merge( req , {identity: user});
        req.body = {...req.body , role: user.role};

        return next();
    
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

//checks if role is patron
export const isPatron = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const role = get (req, 'identity.role') as string;
        //checking if role exists
        if(!role){
            return res.sendStatus(403);
        }
        //checking is patron
        if(role != "Patron"){
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

//checks if role is bookkeeper
export const isBookkeeper = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const role = get (req, 'identity.role') as string;
        //checking if role exists
        if(!role){
            return res.sendStatus(403);
        }
        //checking is patron
        if(role != "Bookkeeper"){
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

//checks if owner
export const isOwner = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const userId = get (req, 'identity._id') as string;
        //checking if user exists
        if(!userId){
            return res.sendStatus(403);
        }
        //checking if id is same
        if(userId != id){
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}