import { Auth, User } from "../../Types/types";

const localPath = "http://localhost:8080/"

export async function addPatron(user: User) {
  const response = await fetch(localPath + 'register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: "include"
  });
  
  if(response.status == 400){
    throw new Error("Request Failed! Please Try again.")

  }else if( response.status == 401 || response.status == 403){
    throw new Error("Not Authorized!!")
  }
  const data = await response.json(); 
  return data;
}

export async function authUser( auth: Auth) {
  const response = await fetch(localPath +'login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(auth),
    credentials: "include",
  });
  
  if(response.status == 400){
    throw new Error("Request Failed! Please Try again.")

  }else if( response.status == 401 || response.status == 403){
    throw new Error("Not Authorized!!")
  }
  const data = await response.json(); 
  return data;

}

export async function logoutUser( ){
  const response = await fetch( localPath + "logout",{credentials: "include",})
  if(response.status == 400){
    throw new Error("Request Failed! Please Try again.")

  }else if( response.status == 401 || response.status == 403){
    throw new Error("Not Authorized!!")
  }
  const data = response.status; 
  return data;
}