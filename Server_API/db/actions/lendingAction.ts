import {lendingModel} from '../models';

export const addLending_Action = (values: Record<string,any>) => new lendingModel(values).save().then((lending) => lending.toObject());
export const changeStatus_Action = (id:String, status: String) => lendingModel.findOneAndUpdate(id, {status}); 
export const getLendingByFilter_Action = (filter: any) => lendingModel.find(filter);
export const getLendingById_Action = (id: String) => lendingModel.findById(id);
export const getLendings_Action = () => lendingModel.find();
export const deleteLendingByBorrower_Action = (id: String) => lendingModel.deleteMany({borrowerUser: id,  status: {$ne : "Borrowed"}})
export const deleteLendingByBook_Action = (id: String) => lendingModel.deleteMany({bookId: id,  status: {$ne : "Borrowed"}})