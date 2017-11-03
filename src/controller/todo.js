import todo from './todo';
import mongoose from "mongoose";
import { Router } from "express";
import ToDo from "../model/todo";

import {authenticate} from "../middleware/authmiddleware";

export default ({ config, db }) => {
    let api = Router();

    //"/v1/todo/add"
    api.post("/add", authenticate,(req, res) => {
        let newToDo = new ToDo();
        newToDo.title = req.body.title;

        newToDo.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "New ToDo added successfully" });
        });
    });

    api.get("/", authenticate,(req, res) => {
        ToDo.find({}, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        });
    });

    api.get("/:id", authenticate,(req, res) => {
        ToDo.findById(req.params.id, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json(todo);
        });
    });

    api.put("/:id",authenticate, (req, res) => {
        ToDo.findById(req.params.id, (err, todo) => {
            if (err) {
                res.send(err);
            }
            todo.title = req.body.title;
            todo.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Todo updated" })
            })
        });
    });

    api.delete("/:id",authenticate, (req, res) => {
        ToDo.remove({
            _id: req.params.id
        }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Todo removed successfully" });
        });
    });

    return api;
}