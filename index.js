import express from 'express'
import {UserModel, TodoModel} from './db.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://vishwkarmaarvind1222:arvind815317@completecoding.mdabdwf.mongodb.net/todoWithDB")

const app = express()

app.use(express.json())

const JWT_SECRET = "huy&ft%ttgj"

app.post('/signup', async(req, res) => {
    const {email, password, name} = req.body

   await UserModel.create({
        email: email,
        password: password,
        name: name

    })
    res.json({
        message: "You are logged in"
    })

})

app.post('/signin', async(req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user)

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            msg: "Incorrect Credentials"
        })
    }
})

function auth(req, re, next){
    const token = req.headers.token
    const decodeData = jwt.verify(token, JWT_SECRET)

    if(decodeData){
        req.userId = id
        next()
    } else{
        res.json({
            msg: "invalid credentials"
        })
    }
}

app.post('/todo', auth, async(req, res) => {

    const userId = req.userId
    const {title, done} = req.body;
    await TodoModel.create({
        title: title,
        done: done
    })

    res.json({
        msg: "Todo created successfully"
    })


})

app.get('/todos', auth, async(req, res) => {
    const userId = req.userId
    const todos = await TodoModel.find({
        userId: userId
    })
    res.json(todos)
})
app.listen(3000)