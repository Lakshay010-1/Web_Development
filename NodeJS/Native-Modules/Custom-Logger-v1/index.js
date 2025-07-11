const os = require("os");
const fs= require("fs");
const EventEmitter=require("events");

class Logger extends EventEmitter{
    log(msg){
        this.emit("msg",msg);
    }
}

const logger=new Logger();
const filePath="./details.txt";

const logToFile=(event)=>{
    const msg=`${new Date().toISOString()} - ${event}\n`;
    fs.appendFileSync(filePath,msg);
};

logger.on("msg",logToFile);

setInterval(()=>{
    logger.log(`Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
    logger.log(`Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB\n`);
},2000);

logger.log("Application Started");
logger.log("Application Performing\n");


/*

- EventEmitter is used to decouple the logging trigger (log()) from the logging action (logToFile()).

- fs is used to append log messages to a file.

- setInterval simulates periodic logging, like heartbeat or activity tracking.

*/