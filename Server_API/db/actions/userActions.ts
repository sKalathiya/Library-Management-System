import {userModel} from '../models';



export const getUser_Action = () => userModel.find();
export const getUserByFilter_Action = (filter: any) => userModel.find(filter);
export const getUserById_Action = (id: string)  => userModel.findById(id);
export const getUserByEmail_Action = (email: string)  => userModel.findOne({email});
export const addUser_Action = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUser_Action = (id: string) => userModel.findOneAndDelete({_id: id});
export const updateUser_Action  = (id: string, values: Record<string,any>) => userModel.findByIdAndUpdate(id,values);