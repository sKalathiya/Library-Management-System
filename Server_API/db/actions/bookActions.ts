import {bookModel} from '../models';

export const getBooks_Action = () => bookModel.find();
export const getBooksByFilter_Action = (filter: any) => bookModel.find(filter);
export const getBookById_Action = (id: string)  => bookModel.findById(id);
export const addBook_Action = (values: Record<string, any>) => new bookModel(values).save().then((book) => book.toObject());
export const deleteBook_Action = (id: string) => bookModel.findOneAndDelete({_id: id});
export const updateBook_Action  = (id: string, values: Record<string,any>) => bookModel.findByIdAndUpdate(id,values);

