import express from 'express'

const app = express()
app.use(express.json())

app.post('/login', (req, res) => {
    const {userName, password} = req.body
    if(userName === "admin" && password === 1234){
        res.status(200).json({
            msg: "successful"
        })
    }
    res.status(400).json({
        msg:"Invalid Credentials"
    })

})

 app.post('/validate/user', (req, res) => {
        const {name, age, email} = req.body 
        if(!name && name.trim() === ''){
            return res.status(400).json({
                msg: "Name can not be empty"
            })
        }

        if(isNaN(age)){
            return res.status(400).json({
                msg: "Age must be a number"
            })
        }

        if(!email.includes('@')){
            return res.status(400).json({
                msg: "Email must contain @"
            })
        }
    })

app.listen(3000)