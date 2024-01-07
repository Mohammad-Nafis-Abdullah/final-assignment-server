import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://jaimashashi:chhiq1wj6wUznHe8@mycluster.pjyrzn2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export default function dbConnection(dbName:string){
  return new Promise<{client:MongoClient,db:Db}>(async(res,rej)=> {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const db = client.db(dbName);
      res({client,db});
    } catch (error) {
      rej(error)
    } finally {
      // await client.close();
    }
  })
}