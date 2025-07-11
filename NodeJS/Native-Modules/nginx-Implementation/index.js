const fs=require("fs");
const path=require("path");
const http=require("http");

const port=3000;

const server=http.createServer((req,res)=>{

    const reqUrl=req.url;
    const filePath=path.join(__dirname,(reqUrl=="/")?"index.html":reqUrl);
    
    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code=="ENOENT"){
                res.writeHead(404,"Content not found!");
                res.end("Page not found!");
            }
        }else{
            res.writeHead(200,"Page Found!");
            res.end(content,"utf-8");
        }
    });
});

server.listen(port, ()=>{
    console.log("Listening on port -",port);
});

/*

- The server listens for HTTP requests.

- Based on the URL path, it either:
    -> Serves static files like HTML, CSS, JS from a /public directory.
    -> Forwards (proxies) requests to internal routes or simulated backend logic (like APIs).

- This mimics how NGINX handles routing and serves both static and dynamic content.

*/