import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
    name: String,
    email: String,
    password: String
});

const Todo = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: String,
    done: Boolean
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

export { UserModel, TodoModel };