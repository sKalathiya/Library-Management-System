import mongoose from 'mongoose';


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

export const bookModel = mongoose.model("Book", bookSchema);
