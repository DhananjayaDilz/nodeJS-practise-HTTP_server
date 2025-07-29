/**
 * Node modules
 */
import winston from "winston"



/**
 * local modules
 */
import config from "@/config";




const {combine, timestamp, json, errors, align, printf,colorize} = winston.format;

//define the transport array to hold different logging transport
const transports :winston.transport[]= [];

//if the application is not running in production add a console transport
if(config.NODE_ENV == "production"){
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all:true}),
                timestamp({format: "YYYY-MM-DD hh:mm:ss A"}),
                align(),
                printf(({timestamp, level, message, ...meta}) =>{
                    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : ``;

                    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
                }),
            ),
        }),
    )
}

//create a logger instance using winston
const logger = winston.createLogger({
    level: config.LOG_LEVEL || "info",
    format: combine(timestamp(), errors({ stack:true}), json()), //use jsn format for log
    transports,
    silent: config.NODE_ENV == "test", //dissable logging in trst env

})

export {logger};