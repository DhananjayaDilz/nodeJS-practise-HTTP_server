import mongoose from  "mongoose";

import config from "@/config";


import type { ConnectOptions } from "mongoose";
import { promises } from "dns";

const clientOption : ConnectOptions = {
    dbName: "blog-db",
    appName : "Blog API",
    serverApi:{
        version: "1",
        strict : true,
        deprecationErrors : true,
    }

}

export const connectToDatabase = async (): Promise<void> =>{
    if (!config.MONGO_URI) {
        throw new Error("mongo db URI is not defined")
    }
    
    try {
        await mongoose.connect(config.MONGO_URI, clientOption);

        console.log("connect db succes", {
            uri : config.MONGO_URI,
            option : clientOption
        });
    } catch (err) {
        if (err instanceof Error) {
            throw err
        }
        console.log("Error connecting to database", err)
    }
}


export const disconnectFromDatabase = async (): Promise<void> =>{
    try {
        await mongoose.disconnect();

        console.log("disconnect from db", {
            uri : config.MONGO_URI,
            option : clientOption
        });
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        console.log("Error disconnecting from database", err)
    }
}