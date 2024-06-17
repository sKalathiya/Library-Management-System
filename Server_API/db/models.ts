import mongoose from 'mongoose';


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
    "bookId": {type: String, require: true},
    "borrowerUser": {type: String, require: true},
    "lenderUser": {type: String, require: true},
    "updatedByUser": {type: String, require: true},
    "date_Borrowed": {type: Date, require: true},
    "Last_Updated": {type: Date, require: true, select: false},
    "Expected_Returned": {type: Date, require: true, select: false},
    "borrowedDays": {type: Number, require: true, select: false},
    "status": {type: String, enum:['Returned', 'Borrowed', 'Damaged', 'Lost', 'Delayed Return', "Cancelled"], require: true}
})


export const bookModel = mongoose.model("Book", bookSchema);
export const userModel = mongoose.model("User", userSchema);
export const authenticationModel = mongoose.model("Authentication", authenticationSchema);
export const lendingModel = mongoose.model("Lending", lendingSchema);
