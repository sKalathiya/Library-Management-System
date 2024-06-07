import mongoose from 'mongoose';
import { authentication } from '../helpers';


const bookSchema = new mongoose.Schema({
    "title": {type: String, require: true},
    "author": {type: String, require: true},
    "cover": {type: String, require: true},
    "publish_year": {type: Number , require: true},
    "publisher": [String],
    "language": [String],
    "copies": { type: Number, require: true},
    "category": { type: String, require: true},

});

const userSchema = new mongoose.Schema({
    "firsName": {type: String, require: true},
    "lastName": {type: String, require: true},
    "address": {
        "street": {type: String, require: true},
        "city": {type: String, require: true},
        "country": {type: String, require: true},
        "post_code": {type: String, require: true},
    },
    "email": {type: String, require: true},
    "phone": {type: Number, require: true},
    "authentication": {
        "password" : {type: String, required: true , select: false},
        "key" : {type:String, select: false},
        "sessionToken" : { type:String, select: false}
    }

})

export const bookModel = mongoose.model("Book", bookSchema);
export const userModel = mongoose.model("User", userSchema);
