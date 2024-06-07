import express from "express";
import { getUserByFilterAction, addUserAction } from "../db/actions/userActions";
import { random, authentication } from "../helpers";

/************************************************  USER *********************************************** */


//register
export const registerUser = async ( req: express.Request, res: express.Response) => {
    try {
  
      
    const { firstName, lastName, email, phone, address, password} = req.body;
   
  
    //checking if present
    if( !firstName || !lastName || !email || !phone || !address.street || !address.city || !address.country || !address.post_code || !password){
        
        return res.sendStatus(400);
    }
   
    //calling action to see if same user present
    const same_user = await getUserByFilterAction({email });
    console.log(same_user);
    if(same_user.length != 0){
       
      return res.sendStatus(400);
    }
  
    //key to secure password
    const key = random();
  
    //calling action to add user
    const user = await addUserAction( {firstName, lastName, email, phone, address, authentication : {
      password: authentication(key, password),
      key,
  
    }});
  
    res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
  }
  