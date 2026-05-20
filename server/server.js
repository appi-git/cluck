const express = require('express');
const app = express()
const port = process.env.PORT || 3000

/*
fetch("C:\Users\surface_aadil\Projects\cluck\server\data.json", {method: "GET"})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
*/
app.get('/', (req, res) => {
    console.log("got a request");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`list port ${port}`)
})