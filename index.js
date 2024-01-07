// import DB from "./mongodb";

// import successFn from "./successFn";

const successFn = require("./successFn");
const DB = require("./mongodb");
const express = require("express");
const PORT = 5000;


const app = express();
app.use(express.json());

const db = new DB("final-assignment");

(async () => {
    try {
        await db.dbConnection(({ client, dbName }) => {
            successFn({ client, dbName, app })
        }, (err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
})()

app.get('/', async (req, res) => {
    res.send({
        status: 200,
        message: `Server is running successfully`,
    });
})

app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
})