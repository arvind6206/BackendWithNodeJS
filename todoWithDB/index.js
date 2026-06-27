import express from "express";  
import { UserModel, TodoModel } from "./db.js";
import { auth, JWT_SECRET } from "./auth.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; 
import bcrypt from 'bcryptjs'
import {z} from 'zod'

mongoose.connect("mongodb+srv://vishwkarmaarvind1222:arvind815317@completecoding.mdabdwf.mongodb.net/todoWithDB")

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

    const requireBody = z.object({
        email: z.string(),
        name: z.string(),
        password: z.string()
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body)
    if(!parseDataWithSuccess.success){
        return res.json({
            msg: "Incorrect format"
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5)
    console.log(hashedPassword)

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {
    //i/p validation

    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    })

    if(!response){
        return res.json({
            msg: "User does not exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password)

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);