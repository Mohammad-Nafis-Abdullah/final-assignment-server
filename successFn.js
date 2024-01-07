const express = require("express");
const app = express();

module.exports = function successFn({ client, dbName }) {
  console.log('insert into successFn');
    // const incomeList = dbName.collection("income-list");
    const incomeList = client.db('final-assignment').collection("income-list");
    // const expenseList = dbName.collection("expense-list");
    const expenseList = client.db('final-assignment').collection("expense-list");
  
    console.log({incomeList});
    console.log({expenseList});
    

    app.get('/income-list', async (req, res) => {
      const data = await incomeList.find({}).toArray();
      console.log("income",data);
      res.send({ listName: "income-list", status: 200, data });
    })

    app.get('/expense-list', async (req, res) => {
      const data = await expenseList.find({}).toArray();
      console.log("expense",data);
      res.send({ listName: "expense-list", status: 200, data });
    })
}