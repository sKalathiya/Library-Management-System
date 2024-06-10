export interface User  {
    firstName: string,
    lastName: string,
    phone: string,
    address:{
      street: string,
      city: string,
      country:string,
      post_code:string,
    },
    email:string,
    password:string,
    role: string
}

export interface Auth {
  email: string,
  password: string

}

export interface Session {
  firstName: string;
  _id: string;
  role: string
}