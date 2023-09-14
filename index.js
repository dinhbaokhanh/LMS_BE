import express from "express";
import cors from "cors"
import firebase from "./service/firebase.js";
import * as dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js";
import handleError from "./middlewares/errorHandler.js"
import routerPath from "./routes/index.js";
dotenv.config();
import { getFirestore } from "@firebase/firestore";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors())
dbConnect()

firebase();
export const firestore = () => getFirestore()
routerPath.forEach(({ path, route }) => app.use(path, route))

app.use(handleError)
app.listen(port, () => {
    console.log("Server is Running");
})