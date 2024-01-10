import { Db, MongoClient } from "mongodb";

// Extend the Request interface in place to include your custom variable
declare global {
  namespace Express {
      interface Request {
          mongoClient: MongoClient;
          mongoDB: Db;
      }
  }
}


export {};