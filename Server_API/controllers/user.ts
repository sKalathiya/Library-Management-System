import express from 'express';
import {addUser_Action, deleteUser_Action, getUser_Action, getUserByFilter_Action, getUserById_Action, updateUser_Action} from '../db/actions/userActions';
import { deleteAuthentication_Action } from '../db/actions/authenticationActions';
import { deleteLendingByBorrower_Action, getLendingByFilter_Action} from '../db/actions/lendingAction';



/********************************GET REQUESTS********************************** */


//Get all users
export const getUsers = async( req: express.Request, res: express.Response) => {
    try {
     
      //calling _Action to get users
      const users = await getUser_Action();
  
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
  
      //calling _Actions to get user by ID
      const user = await getUserById_Action(id);
  
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

      //calling _Action to filter users
      const users = await getUserByFilter_Action(data);
  
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
  const { firstName, lastName, email, phone, address, role} = req.body

  //checking if present
  if( !firstName || !lastName || !email || !phone || !address.street || !address.city || !address.country || !address.post_code || !role ){
    return res.sendStatus(400);
}

  //calling _Action for checking if same user present
  const same_user = await getUserByFilter_Action({email, _id: {$ne: id} });  

  if(same_user.length != 0){
    return res.sendStatus(400);
  }

  //calling _Action to update
  const user = await updateUser_Action(id, {firstName, lastName, email, phone, address, role });

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

    //checking if any lending is available
    const lendings = await getLendingByFilter_Action({borrowerUser : id, status: "Borrowed"})
    if(lendings.length != 0){
      return res.sendStatus(400);
    }

    //calling _Action to delete user
    const user = await deleteUser_Action(id);

    //checking if user was deleted
    if( user ){

        //removing authentication
        const authenticate = await deleteAuthentication_Action(id);

        //if removed
        if(authenticate){
          //removing lendings
          await deleteLendingByBorrower_Action(id);
          return res.sendStatus(200);
        }
        //if not removed
        else{
          //add user back again
          await user.save();
          return res.sendStatus(400);
        }
    }else{
        return res.sendStatus(400);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


