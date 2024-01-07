import express, { Request, Response } from "express";
import cors from "cors";
import dbConnection from "./db/mongodb";
import { Db, MongoClient } from "mongodb";
import listRouter from "./routes/list.router";

// Extend the Request interface in place to include your custom variable
declare global {
    namespace Express {
        interface Request {
            client: MongoClient;
            db: Db;
        }
    }
}

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

(async () => {
    try {
        const { client, db } = await dbConnection("final-assignment");
        app.use((req, res, next) => {
            req.client = client;
            req.db = db;
            next();
        });

        // all routes
        app.use("/list", listRouter);

        // check undeclared url
        app.use("*", (req, res) => {
            res.status(404).send({
                status: 404,
                message: "Not Found",
                route: req.originalUrl,
            });
        });
    } catch (err) {
        console.log(err);
    }
})();

app.get("/", async (req: Request, res: Response) => {
    res.status(200).send({
        status: 200,
        message: `Server is running successfully at : https://${req.hostname}`,
    });
});

app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
});
