import express from 'express';

import {isAuthenticated, isBookkeeper, isOwner} from '../middlewares';
import { addLending, changeStatusOfDeal, getLendingByFilter, getLendingById, getLendingDeals } from '../controllers/lending';


export default (router: express.Router) => {
    router.post("/lending", isAuthenticated, isBookkeeper, addLending);
    router.get("/lending/:id", isAuthenticated, getLendingById);
    router.get("/lending", isAuthenticated, isBookkeeper, getLendingDeals);
    router.get("/lending/filter", isAuthenticated, getLendingByFilter )
    router.post("/lending/status/:id", isAuthenticated, isBookkeeper, changeStatusOfDeal);
}