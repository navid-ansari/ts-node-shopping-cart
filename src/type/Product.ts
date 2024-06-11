import mongoose, { Types } from "mongoose"

export interface Product { //  extends mongoose.Document
    name: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string
}