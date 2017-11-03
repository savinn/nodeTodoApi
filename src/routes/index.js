import express from "express";
import config from "../config";
import middleware from "../middleware";
import initializeDb from "../db";
import todo from "../controller/todo";

let router = express();

//connect to db

initializeDb(db => {
    //internal middleware

    router.use(middleware({ config, db }));

    //api routes v1 /(v1)

    router.use("/todo", todo({config, db}))
});

export default router;