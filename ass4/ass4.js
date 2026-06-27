import express from 'express'

const app = express()

app.use(express.json())

const products = [
    {
        id: 1,
        name: "apple",
        price: 50
    },
    {
        id: 2,
        name: "mango",
        price: 40
    },
    {
        id: 3,
        name: "potato",
        price: 20
    },
    {
        id: 4,
        name: "tomato",
        price: 35
    }
]

app.get('/products', (req, res) => {
    res.json(products)
})
app.get('/products/filter', (req, res) => {
    const price = Number(req.query.price)

    const filteredProduct = products.filter(
        product => product.price >= price
    )
    res.json(filteredProduct)
})

app.get('/products/search', (req, res) => {
    const name = req.query.name

    const filteredProduct = products.filter(
        product => product.name === name
    )
    res.json(filteredProduct)
})

app.listen(3000)