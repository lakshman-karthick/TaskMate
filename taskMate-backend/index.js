// /*Overall Aim: Connect to the MongoDB using given connection string*/ 
//---------------------------------------------------------------------------------------------------------------
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import todoDAO from "./dao/todoDAO.js";
//---------------------------------------------------------------------------------------------------------------
dotenv.config();
//---------------------------------------------------------------------------------------------------------------
const mongo_username = process.env['MONGODB_USERNAME'];
const mongo_password = process.env['MONGODB_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.e1uka0m.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 7000;
//---------------------------------------------------------------------------------------------------------------
const MongoClient = mongodb.MongoClient;
//---------------------------------------------------------------------------------------------------------------
MongoClient.connect(uri,{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
}).catch(err=>{
    console.error(err.stack);
    process.exit(1);
}).then(async client =>{
    await todoDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`Server is running in Port ${port}`)
    });
})
//---------------------------------------------------------------------------------------------------------------
