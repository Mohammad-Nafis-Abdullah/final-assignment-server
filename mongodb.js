
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

//   async function run(func) {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       await func(client);
  
//       // // Send a ping to confirm a successful connection
//       // await client.db("admin").command({ ping: 1 });
//       // console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       // await client.close();
//     }
//   }
// run().catch(console.dir);

module.exports = class DB{
  constructor(dbName){
    this.dbName = client.db(dbName);
  }

  async dbConnection(successFn,rejectFn) {
    console.log('insert into dbConnection function');
    try {
      console.log('insert into dbConnection function try block');
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      successFn({client,dbName: this.dbName});
  
      // // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
      // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.log('insert into dbConnection function catch block');
      rejectFn(error)
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
}