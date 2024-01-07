"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = require("../utils/validators");
const mongodb_1 = require("mongodb");
const listRouter = express_1.default.Router();
listRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all item from the list
    const list = req.db.collection("list");
    const data = yield list.find({}).toArray();
    res.status(200).send({
        status: 200,
        data,
    });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // post an item into the list
    const list = req.db.collection("list");
    const data = req.body;
    if (!(0, validators_1.isValid)(data)) {
        res.status(200).send({
            status: 200,
            message: "invalid data",
        });
    }
    else {
        const result = yield list.insertOne(Object.assign({ _id: new mongodb_1.ObjectId() }, req.body));
        res.status(200).send(Object.assign({ status: 200 }, result));
    }
}));
listRouter
    .route("/:_id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = req.db.collection("list");
    const { _id } = req.params;
    if ((0, validators_1.isValidId)(_id)) {
        const result = yield list.deleteOne({ _id: new mongodb_1.ObjectId(_id) });
        res.status(200).send(Object.assign({ status: 200 }, result));
    }
    else {
        res.status(200).send({
            status: 200,
            message: "Invalid Id",
        });
    }
}));
exports.default = listRouter;
