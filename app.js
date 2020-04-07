const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('client/build'))

app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(port, () => console.log(`::: ${port}`))