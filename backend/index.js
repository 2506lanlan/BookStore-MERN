import express from "express";
import {PORT, mongoDBURL} from "./config.js";

const app = express();
app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send('MERN bookstore');
})
app.listen(PORT, () => {
    console.log(`Current port: ${PORT}`);
});