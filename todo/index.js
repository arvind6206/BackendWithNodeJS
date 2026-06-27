import express from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "huy&ft%dr^gfh"
const app = express()

app.use(express.json())

const users = [];

const todo =[]

app.post('/signup', (req, res) => {
    const {username, password} = req.body;

    users.push({username, password})

    res.json({
        msg: "You are signed up"
    })
})


app.post('/signin', (req, res) => {
    const {username, password} = req.body

    let foundUser = null
    for(let i = 0; i < users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
    }
    if(!foundUser){
        return res.json({
            msg: "User not found"
        })
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token: token
        })
    }
})

app.post('/create', (req, res) => {
    const {id, title, completed} = req.body

    
    const newTodo = {
        id: todo.length + 1,
        title,
        completed: false
    }

    todo.push(newTodo)
    res.json({
        msg: "todo created"
    })
})

app.delete('/del/:id', (req, res) => {
    const index = todo.findIndex(t => t.id === id);

if (index === -1) {
    return res.status(404).json({
        msg: "Todo not found"
    });
}

todo.splice(index, 1);

res.json({
    msg: "Todo deleted successfully"
});
})

app.put('/todo/:id', (req, res) => {
    const id = Number(req.params.id)

    const findTodo = todo.find(
        t => t.id === id
    )
    if(req.body.title){
        findTodo.title = req.body.title
    }
    res.json({
        msg: "Todo updated successfully",
        todo: findTodo
    })

})

app.patch('/complete/:id', (req, res) => {
    const id = Number(req.params.id)

    const todoItem = todo.find(
        item => item.id === id
    )
    if(!todoItem){
        return res.status(404).json({
            msg: "Todo not found"
        })
    }
    todoItem.completed = true
    res.json({
        msg: "Todo marked as completed",
        todo: todoItem
    })
})

app.listen(3000)