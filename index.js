import {createServer} from "http";
import guitars from './data.js';
import { createList,getGuitarContent, view,getForm } from "./content.js";

const server=createServer((request,response)=>{

    const part=request.url.split("/"); //this will extarct the "/delete/id=1" part from the url "http://localhost/delete/id=1"
    
    if (request.method =="POST") {
        let body="";

        request.on("readable", ()=>{
            const data=request.read();//read() method checks whether the data comming as request is readble or net 
            
            if (data!= null) {
                body+=data;
            }

        });

        request.on("end",()=>{
            console.log(body);
        });
    }else{
    
        if (part.includes("delete")) {
            handleDelete(part[2])  //from the url piece "../delete/id"   .. is part[0], delete is part[1], id is part[2]
            redirect(response,"/");
        }else{
            response.writeHead(200,{"Content-type":"text/html ;charset=utf-8"});
            const url=new URL(request.url,'http://localhost') //request.url only gives the "/?id=3" so we have provide the base url
            //console.log(request.url);
            const id=url.searchParams.get('id'); //extract the value at the id in the query param
            let content="";
            if (part.includes("add")) {
                content=getForm();
            }else if(id){
                let guitar=guitars.find((g)=>{return g.id==id}) //find in each object id is equal to the provided id if equal returns true
                content=getGuitarContent(guitar);
            }else{
                content=createList(guitars);
            }

            
            response.end(view(content));
        }
    }
});

function handleDelete(id){
    const index=guitars.findIndex(g=>g.id==id);
    guitars.splice(index,1);
}

function redirect(response,to) {
    response.writeHead(302,{location:to,"content-type":"text/plain"});
    response.end(`redirect to ${to}`);
}
server.listen(80,()=>{
    console.log(`server is running at the port ${server.address().port}` )
})