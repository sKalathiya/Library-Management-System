import mongoose, { Document, Schema } from 'mongoose';

export interface Book extends Document {
    _id: string;
    title: string;
    description: string;
    author: string;
    cover: string;
    publish_year: number;
    publisher: string[];
    language: string[];
    Total_copies: number;
    Available_copies: number;
    category: string;
    last_Updated: Date;
    updatedBy_User: string;
}

export interface User extends Document {
    firstName: string;
    lastName: string;
    phone: number;
    address: {
        street: string;
        city: string;
        country: string;
        post_code: string;
    };
    email: string;
    role: string;
}

const bookSchema = new mongoose.Schema({
    "title": {type: String, require: true},
    "author": {type: String, require: true},
    "description": {type:String,require: true},
    "cover": {type: String, require: true},
    "publish_year": {type: Number , require: true},
    "publisher": [String],
    "language": [String],
    "Total_copies": { type: Number, require: true},
    "Available_copies": { type: Number, require: true},
    "category": { type: String, require: true},
    "last_Updated": {type: Date, require: true},
    "updatedBy_User": {type: String, require: true}

});

const userSchema = new mongoose.Schema({
    "firstName": {type: String, require: true},
    "lastName": {type: String, require: true},
    "address": {
        "street": {type: String, require: true},
        "city": {type: String, require: true},
        "country": {type: String, require: true},
        "post_code": {type: String, require: true},
    },
    "email": {type: String, require: true},
    "phone": {type: Number, require: true},
    "favoriteBooks": [String],
    "role":{type:String, enum: ['Patron','Bookkeeper']}
})

const authenticationSchema = new mongoose.Schema({
    "userId": {type: String, require: true},
    "password" : {type: String, required: true},
    "key" : {type:String},
    "sessionToken" : { type:String},
})

const lendingSchema= new mongoose.Schema({
    "book":{ type: Schema.Types.ObjectId , ref: 'Book' },
    "borrowerUser": { type: Schema.Types.ObjectId, ref: 'User' },
    "lenderUser": { type: Schema.Types.ObjectId, ref: 'User' },
    "updatedByUser": { type: Schema.Types.ObjectId, ref: 'User' },
    "date_Borrowed": {type: Date, require: true},
    "Last_Updated": {type: Date, require: true, select: false},
    "Expected_Returned": {type: Date, require: true, select: false},
    "borrowedDays": {type: Number, require: true, select: false},
    "status": {type: String, enum:['Returned', 'Borrowed', 'Damaged', 'Lost', 'Delayed_Return', "Cancelled"], require: true}
})




export const bookModel = mongoose.model("Book", bookSchema);
export const userModel = mongoose.model("User", userSchema);
export const authenticationModel = mongoose.model("Authentication", authenticationSchema);
export const lendingModel = mongoose.model("Lending", lendingSchema);
