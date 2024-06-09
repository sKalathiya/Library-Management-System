import crypto from 'crypto';
import multer from 'multer';

const secret = "Server_API";
import fs from 'fs';


var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, new Date().getMilliseconds() + file.originalname) 
  }
})

export const upload = multer({ storage: storage });

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest();
}

export const deleteFile = (fileName: string) => {
  fs.rm("uploads/" + fileName, (err) => {
    if(err){
      console.log(err);
    }
   });
}