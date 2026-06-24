import express from 'express'
const app = express()

app.use(express.json())

let requestCount = 0

setInterval(() => {
    requestCount=0;
}, 10000)

function limitCounter(req, res, next){
    requestCount++;
    if(requestCount > 5){
        return res.status(400).json({
            msg: "Rate limit exceeded"
        })
    }
    next()
}
app.use(limitCounter)

app.get('/', (req, res) => {
    res.json({
            msg: "success"
        })
    }
)

app.listen(3001)