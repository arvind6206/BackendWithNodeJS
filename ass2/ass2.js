import express from 'express'
const app = express()

// function ageChecker(req, res, next){
//     const age = req.query.age
//     if(age >= 18){
//         next()
//     } else {
//         res.status(403).json({
//             msg:"age must be greater than 18"
//         })
//     }

// }
// app.use(ageChecker)

// app.get('/',(req,res)=>{
//     res.send("Hii")
// })

function setHeader(req, res, next){
    const role = req.headers["role"]
    if(role === "admin"){
        next()
    } else {
        res.status(403).json({
            msg: "headers is not admin"
        })
    }
}
app.use(setHeader)
app.get('/', (req, res) => {
    res.send("Hii")
})
app.listen(3000)