import {bookModel} from '../models';

export const getBooksAction = () => bookModel.find();
export const getBookByIdAction = (id: string)  => bookModel.findById(id);
export const addBookAction = (values: Record<string, any>) => new bookModel(values).save().then((book) => book.toObject());
export const deleteBookAction = (id: string) => bookModel.findOneAndDelete({_id: id});
export const updateBookAction  = (id: string, values: Record<string,any>) => bookModel.findByIdAndUpdate(id,values);

