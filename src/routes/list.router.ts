import express from "express";
import { isValid, isValidId } from "../utils/validators";
import { ObjectId } from "mongodb";

const listRouter = express.Router();

listRouter
    .route("/")
    .get(async (req, res) => {
        // get all item from the list
        const list = req.mongoDB.collection("list");
        const data = await list.find({}).toArray();
        res.status(200).send({
            status: 200,
            data,
        });
    })
    .post(async (req, res) => {
        // post an item into the list
        const list = req.mongoDB.collection("list");
        const data = req.body;
        if (!isValid(data)) {
            res.status(200).send({
                status: 200,
                message: "invalid data",
            });
        } else {
            const result = await list.insertOne({
                _id: new ObjectId(),
                ...req.body,
            });
            res.status(200).send({
                status: 200,
                ...result,
            });
        }
    });

listRouter
    .route("/:_id")
    .get(async (req, res) => {
        const list = req.mongoDB.collection("list");
        const { _id } = req.params;
        try {
            const data = await list.findOne({ _id: new ObjectId(_id) });
            res.status(200).send({
                status: 200,
                data,
            });
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: err,
            });
        }
    })
    .delete(async (req, res) => {
        // delete an item from the list
        const list = req.mongoDB.collection("list");
        const { _id } = req.params;

        if (isValidId(_id)) {
            const result = await list.deleteOne({ _id: new ObjectId(_id) });
            res.status(200).send({
                status: 200,
                ...result,
            });
        } else {
            res.status(200).send({
                status: 200,
                message: "Invalid Id",
            });
        }
    });

export default listRouter;
