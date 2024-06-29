import express from 'express';
import { getAuthenticationBySession_Action} from '../db/actions/authenticationActions';
import { addLending_Action, getLendingByFilter_Action, getLendingById_Action, getLendings_Action } from '../db/actions/lendingAction';
import {getBookById_Action} from '../db/actions/bookActions';
import { getUserByEmail_Action } from '../db/actions/userActions';
import mongoose from 'mongoose';
import { Book } from '../db/models';

//get all lending
export const getLendingDeals = async (req: express.Request, res: express.Response) => {
    try {
        
        const deals = await getLendings_Action();

        return res.status(200).json(deals).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//getting lending by id
export const getLendingById = async (req: express.Request, res:express.Response) => {
    try {
        
        const { id} = req.params;

        const lendingDeal = await getLendingById_Action(id);
        if(!lendingDeal){
            return res.sendStatus(400);
        }

        return res.status(200).json(lendingDeal).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


//adding lending
export const addLending = async (req: express.Request, res: express.Response) => {

    try {
        
        //getting user from session
    const sessionToken = req.cookies["auth"];
    const auth = await getAuthenticationBySession_Action(sessionToken);
    if(!auth){
        return res.sendStatus(400);
    }
    const lender_id = auth.userId;

    //getting details of lending
    const { email, book_Id, borrowedDays } =  req.body;

    //checking if available and borrowed days greater than 5
    if( !book_Id || !email || !borrowedDays || borrowedDays <5){
        return res.sendStatus(400);
    }

    //getting borrower
    const borrower = await getUserByEmail_Action(email);
    if(!borrower){
        return res.sendStatus(400);
    }
    const borrower_Id = borrower._id.toString();

    //getting book to change copies
    const book = await getBookById_Action(book_Id);
    if(!book ){
        return res.sendStatus(400);
    }
    if(book.Available_copies == 0){
        return res.sendStatus(400);
    }else{
        book.Available_copies = book.Available_copies - 1;
        await book.save();
    }
 
    //adding the lending deal
    const lendingDeal = await addLending_Action({
        book: book_Id,
        borrowerUser: borrower_Id,
        lenderUser: lender_id,
        date_Borrowed: new Date(),
        updatedByUser: lender_id,
        Last_Updated: new Date(),
        Expected_Returned: new Date(new Date().getTime()+(borrowedDays*24*60*60*1000)),
        borrowedDays,
        status: "Borrowed"
    });
    
    return res.status(200).json(lendingDeal).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    

}

//changing status of the lending
export const changeStatusOfDeal = async (req: express.Request, res:express.Response ) => {
    try {
        const{ id} = req.params;
        const {status} = req.body;
        
         //getting user from session
        const sessionToken = req.cookies["auth"];
        const auth = await getAuthenticationBySession_Action(sessionToken);
        if(!auth){
        return res.sendStatus(400);
        }
        const returnedToUser = auth.userId;

        //getting lending deal
        const lendingDeal = await getLendingById_Action(id);
       
        if(!lendingDeal || !lendingDeal.book ){
            return res.sendStatus(400);
        }
   
        //checking if already closed
        if(lendingDeal.status != "Borrowed"){
            return res.sendStatus(400);
        }
   
        //finding book to change copies
        const book = lendingDeal.book as Book;
        if(!book){
            return res.sendStatus(400);
        }

        //checking to decrease or increase the count
        if( status == "Returned" || status == "Delayed Return" || status == "Cancelled"){
            book.Available_copies = book.Available_copies + 1;
        }
        else if( status == "Lost" || status == "Damaged") {
            book.Total_copies = book.Total_copies - 1;
            
        }else{
            return res.sendStatus(400);
        }
        await book.save();
        //changing status of deal
        lendingDeal.status = status;
        lendingDeal.Last_Updated = new Date();
        lendingDeal.updatedByUser = returnedToUser ;
        await lendingDeal.save();

        return res.status(200).json(lendingDeal).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


//Filter lending
export const getLendingByFilter = async (req:express.Request, res:express.Response) => {
    try {
        console.log(req.body)
        const lendingDeals = await getLendingByFilter_Action(req.body);
        return res.status(200).json(lendingDeals).end();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
} 


//Filter lending
export const getDailyLendings = async (req:express.Request, res:express.Response) => {
    try {
        var d = new Date();
        d.setHours(0,0,0,0);    
        const lendingDeals = await getLendingByFilter_Action({ date_Borrowed: {
            $gte: d
            } });
        
        return res.status(200).json(lendingDeals).end();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
} 

