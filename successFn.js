const { ObjectId } = require("mongodb");
const { isValid, isValidId } = require("./schema/dataValidation");

module.exports = function successFn({ client, dbName, app }) {
  const list = dbName.collection("list");

  // get all data of the list
  app.get('/list', async (req, res) => {
    const data = await list.find({}).toArray();
    res.status(200).send({
      status: 200,
      data
    });
  });

  // store an item in the list
  app.post('/list', async (req, res) => {
    const data = req.body;

    if (!isValid(data)) {
      res.status(200).send({
        status: 200,
        message: 'invalid data'
      });
    }
    else {
      const result = await list.insertOne({
        _id: new ObjectId(),
        ...req.body
      });
      res.status(200).send({
        status: 200,
        ...result,
      });
    }
  })

  // delete an item from the list
  app.delete('/list/:id', async (req, res) => {
    const { id } = req.params;
    if (isValidId(id)) {
      const result = await list.deleteOne({ _id: new ObjectId(id) });
      res.status(200).send({
        status: 200,
        ...result
      })
    } else {
      res.status(200).send({
        status: 200,
        message: 'Invalid Id'
      })
    }

  })

  // check undeclared url
  app.use('*', (req, res) => {
    res.status(404).send({
      status: 404,
      message: "Not Found",
      route: req.originalUrl,
    });
  });
}