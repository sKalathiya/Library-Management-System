export interface User {
    firstName: string;
    lastName: string;
    phone: string;
    address: {
        street: string;
        city: string;
        country: string;
        post_code: string;
    };
    email: string;
    password: string;
    role: string;
}

export interface Auth {
    email: string;
    password: string;
}

export interface Session {
    firstName: string;
    _id: string;
    role: string;
}

export interface Alert {
    status: string;
    msg: string;
}

export interface Book {
    _id: string;
    title: string;
    description: string;
    author: string;
    cover: string;
    publish_year: Number;
    publisher: string[];
    language: string[];
    Total_copies: Number;
    Available_copies: Number;
    category: string;
    last_Updated: Date;
    updatedBy_User: string;
}

export interface Tab {
    _id: string;
    tab_title: string;
    tab_type: TabRole;
}

export interface Loan {
    _id: string;
    book: Book;
    borrowerUser: User;
    lenderUser: User;
    updatedByUser: User;
    date_Borrowed: Date;
    Last_Updated: Date;
    Expected_Returned: Date;
    borrowedDays: Number;
    status: Status;
}

export enum Status {
    Returned,
    Borrowed,
    Damaged,
    Lost,
    Delayed_Return,
    Cancelled,
}

export enum TabRole {
    Book,
    Loan,
}
