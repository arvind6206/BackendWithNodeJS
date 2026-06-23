import express from 'express'
const app = express()

app.use(express.json())

let students = [
    {
        id: 1,
        name:"raju",
        roll:50,
        age:25
    },
    {
        id: 2,
        name:"gohan",
        roll:29,
        age:28
    }
]

app.get('/', function(req, res){
    res.json(students)
})

app.get('/students/:id', function(req, res){
    const id = Number(req.params.id)
    const student = students.find(
        student => student.id === id
    )
    res.json(student)
})

app.post('/students', (req, res) => {
    const newStudent = req.body

    students.push(newStudent)
    res.json({
        msg: "new student added successfully",
        student: newStudent
    })
})

app.put('/students/:id', (req, res) => {
    const id = Number(req.params.id)

    const student = students.find(
        student => student.id === id
    )

    if(!student){
        res.json({
            msg: "Student not found"
        })
    }

    if(req.body.name){
        student.name = req.body.name
    }

     if(req.body.age){
        student.age = req.body.age
    } 
    if(req.body.roll){
        student.roll = req.body.roll
    }
    res.json(student)
})

app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id)

    students = students.filter(
        student => student.id !== id
    )
    res.json({
        msg: "deleted successfully",
        students})
})

app.listen(3000)
