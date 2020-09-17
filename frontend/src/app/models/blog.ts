import { User } from './user';

export interface Blog {

    id: number;
    author: User;
    title: string;
    summary: string;
    text: string;
    category: string;
    imageURL: string;
    date: Date;

}
