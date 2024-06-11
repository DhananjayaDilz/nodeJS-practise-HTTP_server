import {createServer} from "http";
import guitars from './data.js';

const server=createServer((request,response)=>{
    response.writeHead(200,{"Content-type":"text/html ;charset=utf-8"});
    const url=new URL(request.url,'http://localhost') //request.url only gives the "/?id=3" so we have provide the base url
    //console.log(request.url);
    const id=url.searchParams.get('id'); //extract the value at teh id in the query param
    const content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Guitars</title>
    </head>
    <body style="font-size: 2rem">
        ${id ? getGuitarContent(id):createList()}
    </body>
    </html>`;
    response.end(content);
});

const createList=()=>
    `<h2>My Guitars</h2>
    <ul>
        ${guitars.map(createListItem).join('\n')}
    </ul>`
    ;

    const createListItem = ({id, make, model}) => `<li><a href="?id=${id}">${make} ${model}</a></li>`;

const getGuitarContent=(id)=>{
    const guitar=guitars.find((g)=>{return g.id==id}) //find in each object id is equal to the provided id if equal returns true
    if (guitar) {
        return `<h2>${guitar.make} ${guitar.model}</h2>`;
    }else{
        return `<h2>guitar doesnt exist</h2>`;
    }
}
server.listen(80,()=>{
    console.log(`server is running at the port ${server.address().port}` )
})