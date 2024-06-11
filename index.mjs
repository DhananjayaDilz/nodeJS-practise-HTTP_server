import {createServer} from "http";

const server=createServer((request,response)=>{
    let content ="hello from node d";
    response.writeHead(200,{"Content-type":"text/html ;charset=utf-8"});
    response.end(content);
});

server.listen(80,()=>{
    console.log(`server is running at the port ${server.address().port}` )
})