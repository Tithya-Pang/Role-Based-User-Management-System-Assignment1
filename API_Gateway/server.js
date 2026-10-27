const express = require("express");
const app = express();

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

proxy.on("error", (error, req, res) => {
    console.error("Proxy connection failed:", error.message);
    if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ message: "Service unavailable. Make sure the requested service is running." }));
});

const jwt = require("jsonwebtoken");

require("dotenv").config({ path: require("path").join(__dirname, ".env") });

function authToken(req, res, next){

    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];


    if(!token){
        return res.status(401).json({
            message:"Please send token"
        });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err,user)=>{

            if(err){
                return res.status(403).json({
                    message:"Invalid token"
                });
            }
            req.user = user;

            next();

        }
    );

}


function authRole(role){
    return(req,res,next)=>{
        if(req.user.role !== role){
            return res.status(403).json({
                message:"Unauthorized"
            });
        }
        next();
    };
}

// Admin service 
app.use(
    "/admin",
    authToken,
    authRole("admin"),
    (req,res)=>{
        req.url="/admin"+req.url;
        proxy.web(
            req,
            res,
            {
                target:"http://localhost:5003"
            }
        );

    }
);

// User service 
app.use(
    "/user",
    authToken,
    authRole("user"),
    (req,res)=>{

        req.url="/user"+req.url;
        req.headers["user-email"] = req.user.email;

        proxy.web(
            req,
            res,
            {
                target:"http://localhost:5004"
            }
        );

    }
);



// Login service
app.use(
    "/auth",
    (req,res)=>{
        req.url="/auth"+req.url;
        proxy.web(
            req,
            res,
            {
                target:"http://localhost:5002"
            }
        );
    }
);

// Register service 
app.use(
    "/register",
    (req,res)=>{
        req.url="/register"+req.url;
        proxy.web(
            req,
            res,
            {
                target:"http://localhost:5001"
            }
        );
    }
);

app.listen(3000,()=>{

    console.log(
        "API Gateway running on port 3000"
    );

});
