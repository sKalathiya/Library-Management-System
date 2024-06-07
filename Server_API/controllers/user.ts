import express from 'express';
import {addUserAction, deleteUserAction, getUserAction, getUserByFilterAction, getUserByIdAction, updateUserAction} from '../db/actions/userActions';




/********************************GET REQUESTS********************************** */


//Get all users
export const getUsers = async( req: express.Request, res: express.Response) => {
    try {
     
      //calling action to get users
      const users = await getUserAction();
  
      return res.status(200).json(users).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
  
  //get user by Id
  export const getUserById = async( req: express.Request, res: express.Response) => {
    try {
      const {id }= req.params;
  
      //calling actions to get user by ID
      const user = await getUserByIdAction(id);
  
      //checking if user present
      if( user ){
          return res.status(200).json(user).end();
      }else{
          return res.sendStatus(400);
      }
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
  
  // Filter users
  
  export const getUsersByFilter = async ( req: express.Request , res: express.Response) => {
    try {
    
      const data = req.body;

      //calling action to filter users
      const users = await getUserByFilterAction(data);
  
      res.status(200).json(users).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
  

  /****************************************************UPDATE DETAILS REQUEST****************************************************** */


//update user
export const updateUser = async ( req: express.Request, res: express.Response) => {
  try {
  const {id} = req.params;
  const { firstName, lastName, email, phone, address} = req.body

  //checking if present
  if( !firstName || !lastName || !email || !phone || !address.street || !address.city || !address.country || !address.post_code ){
    return res.sendStatus(400);
}

  //calling action for checking if same user present
  const same_user = await getUserByFilterAction({email, _id: {$ne: id} });  
  console.log(same_user);

  if(same_user.length != 0){
    return res.sendStatus(400);
  }

  //calling action to update
  const user = await updateUserAction(id, {firstName, lastName, email, phone, address });

  //checking if updated
  if( user ){
    res.status(200).json(user).end();
  }else{
    return res.sendStatus(400);
  }

  } catch (error) {
      console.log(error);
      return res.sendStatus(400);
  }
}




/****************************************************DELETE  REQUEST****************************************************** */


//delete user
export const deleteUser = async ( req: express.Request , res: express.Response) => {
  try {
    const { id} = req.params;

    //calling action to delete user
    const user = await deleteUserAction(id);

    //checking if user was deleted
    if( user ){
        return res.status(200).json(user).end();
    }else{
        return res.sendStatus(400);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


