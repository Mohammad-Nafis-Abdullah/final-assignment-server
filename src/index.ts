import express from "express";
import cors from "cors";
import listRouter from "./routes/list.router";
import "./schemas/global.schema";
import mongodbConnect from "./db/mongodb";
import rootRouter from "./routes/root.router";
import notFoundRouter from "./routes/not-found.router";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(mongodbConnect);

// all routes
app.use("/", rootRouter);
app.use("/list", listRouter);



// not found routes
app.use("*", notFoundRouter);

app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
});
