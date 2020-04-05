const express = require('express')
const app = express()
const port = 5000

app.use(express.static('client/build'))


app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(port, () => console.log(`::: ${port}`))