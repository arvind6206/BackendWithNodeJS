import express from 'express'
const app = express()

app.use(express.json())

let todo = [];

app.get('/', (req, res) => {
    res.json(todo)
})

app.post('/add', (req, res) => {
    const {title} = req.body
    if(!title){
        return res.status(400).json({
            msg: "Title is required"
        })
    }

    const newTodo = {
        id: todo.length + 1,
        title,
        completed: false
    }

    todo.push(newTodo)
    res.status(201).json({
        msg: "Todo added successfully",
        todo: newTodo
    })
})

app.put('/update/:id', (req, res) => {
    const id = Number(req.params.id)

    const updateTodo = todo.find(
        updateTodo => updateTodo.id === id
    )
    if(!updateTodo){
        return res.json({
            msg: "Todo not found"
        })
    }

    if(req.body.title){
        updateTodo.title = req.body.title
    }
    res.json({
        msg: "Todo updated successfully",
        todo: updateTodo
    })

})

app.delete('/todo/:id', (req, res) => {
    const id = Number(req.params.id)

    todo = todo.filter(
        newTodo => newTodo.id !== id
    )
    res.json({
        msg: "deleted successfully",
        todo})
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