// import DB from "./mongodb";

// import successFn from "./successFn";

const successFn = require("./successFn");
const DB = require("./mongodb");
const express = require("express");
const PORT = 5000;


const app = express();

const db = new DB("final-assignment");

(async ()=> {
    try {
        console.log("insert into iife")
      await db.dbConnection(successFn,(err)=> {
          console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
})()

app.get('/',async (req,res)=> {
    res.send('server is running');
})

app.listen(PORT,()=> {
    console.log(`server is running in : http://localhost:${PORT}`);
})