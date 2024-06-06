import express from "express";
import {get, merge} from 'lodash';


export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // merge(req , {identity: user});
        // const id = get( req, "user._id") as string;

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}