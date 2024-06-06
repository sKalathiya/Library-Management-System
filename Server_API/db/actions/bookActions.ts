import {bookModel} from '../models';

export const getBooksAction = () => bookModel.find();
export const addBookAction = (values: Record<string, any>) => new bookModel(values).save().then((book) => book.toObject());
