import { Request, Response, NextFunction } from "express";
import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri =
    "mongodb+srv://jaimashashi:chhiq1wj6wUznHe8@mycluster.pjyrzn2.mongodb.net/?retryWrites=true&w=majority";
const dbName = "final-assignment";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export default async function mongodbConnect(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.originalUrl === "/") {
        next();
    } else {
        try {
            await client.connect();
            const db = client.db(dbName);
            req.mongoClient = client;
            req.mongoDB = db;
            next();
        } catch (error) {
            next(error);
        }
    }
}
