//src/server.ts
/*
 * Node modules
 */
import express from "express";
import cors from "cors";


/*
 * Custom modules
 */
import config from "@/config";


/**
 * Types
 */
import type { CorsOptions } from "cors";


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
app.use(cors(corsOptions))

app.get("/", (req,res) =>{
    res.json({
        message: "hello typescript"
    })
})

app.listen(config.PORT, ()=>{
    console.log(`server running : http://localhost:${config.PORT}`)
});