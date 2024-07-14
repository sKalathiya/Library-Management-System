import { model } from 'mongoose';
import {Book, User, lendingModel} from '../models';

export const addLending_Action = (values: Record<string,any>) => new lendingModel(values).save().then((lending) => lending.toObject());
export const changeStatus_Action = (id:String, status: String) => lendingModel.findOneAndUpdate(id, {status}); 
export const getLendingByFilter_Action = (filter: any) => lendingModel.find(filter).populate<{ book: Book | string , borrowerUser: User | string, lenderUser: User | string, updatedByUser: User | string}>("book borrowerUser lenderUser updatedByUser");
export const getLendingById_Action = (id: String) => lendingModel.findById(id).populate<{ book: Book | string , borrowerUser: User | string, lenderUser: User | string, updatedByUser: User | string}>("book borrowerUser lenderUser updatedByUser");
export const getLendings_Action = () => lendingModel.find().populate<{ book: Book , borrowerUser: User, lenderUser: User, updatedByUser: User}>("book borrowerUser lenderUser updatedByUser");
export const deleteLendingByBorrower_Action = (id: String) => lendingModel.deleteMany({borrowerUser: id,  status: {$ne : "Borrowed"}})
export const deleteLendingByBook_Action = (id: String) => lendingModel.deleteMany({book: id,  status: {$ne : "Borrowed"}})