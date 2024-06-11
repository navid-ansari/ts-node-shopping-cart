//import mongoose from 'mongoose';

const mongoose = require('mongoose')

export const connectMongoDB = async () => {
    const uri: string = "mongodb+srv://navidansari:dC7eb7lBZXifkjTs@shopping-cart-cluster.qc2werl.mongodb.net/SHOPPING_CART"
    try {
        await mongoose.connect(uri)
        console.log("Mongodb connection established")
    } catch(error: unknown) {
        console.log("Mongodb connection failed")
        process.exit(1)
    }
    
}