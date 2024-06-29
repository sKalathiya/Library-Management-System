import express from 'express';

import {isAuthenticated, isBookkeeper, isOwner} from '../middlewares';
import { addLending, changeStatusOfDeal, getDailyLendings, getLendingByFilter, getLendingById, getLendingDeals } from '../controllers/lending';


export default (router: express.Router) => {
    router.get("/lending/dailyLendings", isAuthenticated, isBookkeeper, getDailyLendings);
    router.get("/lending/self/:id", isAuthenticated, getLendingById);
    router.get("/lending", isAuthenticated, isBookkeeper, getLendingDeals);
    router.post("/lending/filter", isAuthenticated,isBookkeeper, getLendingByFilter );
    router.post("/lending", isAuthenticated, isBookkeeper, addLending);
    router.post("/lending/status/:id", isAuthenticated, isBookkeeper, changeStatusOfDeal);
}