import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server" 

let mongod: any

export const connectMockMongoDB = async() => {
    const mongooseOptions = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        poolSize: 10
    }

    mongod = await MongoMemoryServer.create();

    const uri = await mongod.getUri()

    try {
        await mongoose.connect(uri,
            {
                dbName: "SHOPPING_CART"
            }    
        )
        //console.log("Test DB connected")
    } catch(error: any) {
        //console.log("Test DB connection failed")
    }
}

export const closeMockMongoDB = async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

export const clearMockMongoDBCollection = async() => {
    const collections = mongoose.connection.collections
    for(const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
}