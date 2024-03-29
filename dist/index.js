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
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./db/mongodb"));
const list_router_1 = __importDefault(require("./routes/list.router"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client, db } = yield (0, mongodb_1.default)("final-assignment");
        app.use((req, res, next) => {
            req.client = client;
            req.db = db;
            next();
        });
        // all routes
        app.use("/list", list_router_1.default);
        // check undeclared url
        app.use("*", (req, res) => {
            res.status(404).send({
                status: 404,
                message: "Not Found",
                route: req.originalUrl,
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}))();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({
        status: 200,
        message: `Server is running successfully at : https://${req.hostname}`,
    });
}));
app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
});
