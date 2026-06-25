import express from 'express'
 const app = express()

//  let requestCount = 0;
//  function customMiddleware(req, res, next){
//     requestCount += 1
//     console.log(req.method)
//     console.log(req.url)
//     console.log("count="+requestCount)
//     next()
//  }
//  app.use(customMiddleware)
 app.get('/', (req, res) => {
    res.send("Hii")
 })

  app.get('/', (req, res) => {
    res.send("There")
 })

 app.listen(3000)