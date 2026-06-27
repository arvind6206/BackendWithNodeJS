import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
    email: String,
    password: String,
    name: String
});

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

export {UserModel, TodoModel}