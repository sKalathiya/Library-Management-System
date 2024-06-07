import {userModel} from '../models';



export const getUserAction = () => userModel.find();
export const getUserByFilterAction = (filter: any) => userModel.find(filter);
export const getUserByIdAction = (id: string)  => userModel.findById(id);
export const addUserAction = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUserAction = (id: string) => userModel.findOneAndDelete({_id: id});
export const updateUserAction  = (id: string, values: Record<string,any>) => userModel.findByIdAndUpdate(id,values);