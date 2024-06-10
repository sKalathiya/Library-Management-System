import express from "express";
import { getUserByFilter_Action, addUser_Action, deleteUser_Action, getUserById_Action, getUserByEmail_Action } from "../db/actions/userActions";
import {  addAuthentication_Action, getAuthenticationBySession_Action, getAuthentication_Action, updateAuthentication_Action} from '../db/actions/authenticationActions';
import { random, authentication } from "../helpers";

/************************************************  USER *********************************************** */

//Login
export const loginUser = async (req:express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body;

    //checking is available
    if( !email || !password){
      return res.sendStatus(400);
    }

    //finding the user
    const user = (await getUserByEmail_Action(email));
    let auth;
    if(user){
      auth = await getAuthentication_Action(user._id.toString());
    }else{
        return res.sendStatus(400);
    }

    const expectedHash = authentication(auth.key , password);

   //matching the hash
    if( expectedHash.toString() !== auth.password){
        return res.sendStatus(401);
    }

    //setting session
    const key = random();
    auth.sessionToken = authentication(key, user._id.toString()).toString();

    await auth.save();

    //setting cookie
    res.cookie("auth",auth.sessionToken);

    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


//Logout
export const logoutUser = async( req: express.Request, res: express.Response) => {
  try {
    const sessionToken  = req.cookies["auth"];
    //checking session
    if( !sessionToken){
      return res.sendStatus(403);
    }
    // if such user exists
    const auth  = await getAuthenticationBySession_Action(sessionToken);

    if( !auth){
      return res.sendStatus(400);
    }

    auth.sessionToken = undefined;
    await auth.save();
    
    res.clearCookie("auth");

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    console.log(400);
  }
}

//register
export const registerUser = async ( req: express.Request, res: express.Response) => {
    try {
  
      
    const { firstName, lastName, email, phone: p, address, password, role} = req.body;

    const phone: Number = Number(p);
   
  
    //checking if present
    if( !firstName || !lastName || !email || !phone || !address.street || !address.city || !address.country || !address.post_code || !password || !role){
        
        return res.sendStatus(400);
    }
   
    //calling _Action to see if same user present
    const same_user = await getUserByFilter_Action({email });
    if(same_user.length != 0){
      return res.sendStatus(400);
    }
  
    //key to secure password
    const key = random();
  
    //calling _Action to add user
    const user = await addUser_Action( {firstName, lastName, email, phone, address, role});
  

    //checking is user added
    if( user ){

      //adding auth
      const auth = await addAuthentication_Action({userId: user._id.toString(), password: authentication(key, password), key});

      //checking if auth added
      if( auth){  
        //added
        return res.status(200).json(user).end();

      }else{
        //delete user as auth not added
        await deleteUser_Action(user._id.toString());
        return res.sendStatus(400);
      }

    }else{
      //user not added
      return res.sendStatus(400);
    }
  
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
  }
  

  //update Password

  export const updateAuth = async (req: express.Request, res:express.Response) => {
    try {
      const {id} = req.params;
      const{ password, newPassword} = req.body;

      if( !id || !password || !newPassword){
        return res.sendStatus(400);
      }

      //getting auth
      const auth = await getAuthentication_Action(id);

      const expectedHash = authentication(auth.key, password);

      if( expectedHash.toString() != auth.password) {
        return res.sendStatus(401);
      }

      const newKey = random();
      auth.password = authentication(newKey, newPassword).toString();
      auth.key = newKey;
      await auth.save();

      return res.sendStatus(200);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }