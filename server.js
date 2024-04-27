const express = require('express');
const app = express();

//routes

app.get('/', (req, res)=> {
    res.send('hello');
})

app.listen(3000, ()=> {
    console.log('node api app is running on port 3000')
});