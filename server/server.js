const express = require('express');
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    console.log("got a request");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Hello World!')
})

const oldObj = {key1:"value1", key2:"value2", key3:"value3"};

app.listen(port, () => {
  console.log(oldObj);
  replaceObj(oldObj);
  console.log(oldObj);
  console.log(`list port ${port}`)
})