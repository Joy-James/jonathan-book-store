const express = require('express');
require('dotenv').config();
const { createClient } = require('redis');
const RedisStore = require("connect-redis").default;

const booksrouter = require('./routes/booksRoute')
const authorize = require("./middlewares/authorize")

const app = express();

app.use(express.json());

function startAPILogic(){
    try {

        const redisClient = createClient();
        redisClient.connect();
        console.log("Connected to Redis")
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: ''
        })
        
        


        app.get('/', async(req, res)=>{
            
            res.send("Books service Ok")
            
            
            
        })

        app.use('/books', async(req, res, next)=>{
            let cookie = req.headers['cookie']
            let sessionID = cookie.substring(16, 52)
            let session = await redisClient.get(sessionID)
            if(session){
                let real_session = JSON.parse(session)
                console.log(real_session);
                next()
            }else{
                res.status(403).json({
                    success:false,
                    message: "login to proceed"
                })
            }
        })
        
        // app.use('/books', authorize)
        app.use('/books', booksrouter)
        
        app.use("*", (req, res, next)=>{
            const error =  new Error("Route not found");
            next({
                status:404,
                message: error.message
            })
        })
        
        app.use((error, req, res, next )=>{
            res.status(error.status).json(error.message)
        })
        
        
        
        
        
        
        const port = process.env.PORT || 5000;
        
        app.listen(port, ()=>console.log(`Server on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

startAPILogic()