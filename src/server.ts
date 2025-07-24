//src/server.ts
/*
 * Node modules
 */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";


/*
 * Custom modules
 */
import config from "@/config";
import limiter from "@/lib/express_rate_limit";
import { connectToDatabase ,disconnectFromDatabase } from "@/lib/mongoose";


/**
 * Types
 */
import type { CorsOptions } from "cors";


/**
 * Routes
 */
import v1Routes from "@/routes/v1"



const app = express();

//enable express json body parser
app.use(express.json())

//enable URL-encoded req body parsing with extended mode
//"extended:true" allow rich objects and arrays via query string library
app.use(express.urlencoded({extended:true}))

//configure cors options
const corsOptions : CorsOptions = {
    origin(origin,callback){
    
        if (config.NODE_ENV == "development" ||  !origin || config.WHITELIST_ORIGINS.includes(origin)) {
            callback(null,true)
        } else {
            //Reject requests from non whitelisted origins
            callback(new Error(`CORS Error : ${origin} is not allowed `),false)
        }
    },
};

//Apply cors middleware
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(compression({
    threshold:1024 
}));

app.use(helmet());

app.use(limiter);



(async ()=>{
    try {
        await connectToDatabase();
        app.use("/api/v1", v1Routes);
        
        app.listen(config.PORT, ()=>{
            console.log(`server running : http://localhost:${config.PORT}`)
        });
    } catch (err) {
        console.log("fail to sartt server" ,err)

        if (config.NODE_ENV== "production") {
            process.exit(1)
        }
    }
})();


/* Handles server shutdown gracefully by disconnecting from the database.
* - Attempts to disconnect from the database before shutting down the
server.
*-Logs a success message if the disconnection is successful.
* - If an error occurs during disconnection, it is logged to the console.
* - Exits the process with status code '0' (indicating a successful shutdown).
*/
const handleServerShutdown = async () =>{
    try {
        await disconnectFromDatabase();
        console.log("server SHUTDOWN");
        process.exit(0)
    } catch (err) {
        console.log("Error during server shutting down")
    }
};


//SIGTERM Sent when user kill the process
// SIGINT Sent when user interupt the process by pressing ctrl + c  both of these hapen the function handleServerShutdown executes
process.on("SIGTERM", handleServerShutdown);  
process.on("SIGINT", handleServerShutdown);   
