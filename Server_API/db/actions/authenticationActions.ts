import {authenticationModel} from '../models';


export const getAuthentication_Action = (userId: string) => authenticationModel.findOne({userId});
export const getAuthenticationBySession_Action = (sessionToken: string) => authenticationModel.findOne({sessionToken});
export const addAuthentication_Action = (values: Record<string, any>) => new authenticationModel(values).save().then((authentication) => authentication.toObject());
export const updateAuthentication_Action = (id:string, values: Record<string, any>) => authenticationModel.findOneAndUpdate({userId: id},values);
export const deleteAuthentication_Action  = (id: string) => authenticationModel.findOneAndDelete({userId: id}); 