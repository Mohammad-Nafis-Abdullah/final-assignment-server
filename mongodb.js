
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jaimashashi:chhiq1wj6wUznHe8@mycluster.pjyrzn2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


module.exports = class DB {
  constructor(dbName) {
    this.dbName = client.db(dbName);
  }

  async dbConnection(successFn, rejectFn) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      await successFn({ client, dbName: this.dbName });
    } catch (error) {
      rejectFn(error)
    } finally {
      // await client.close();
    }
  }
}