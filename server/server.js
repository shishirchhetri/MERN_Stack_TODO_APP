const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000
const MONGOURL = process.env.MONGOURL
const todoRoute = require('./routes/todoItems')
const cors = require('cors')

app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Hello!!")
})
app.use(cors());

  
mongoose.connect(MONGOURL)
.then(()=> console.log("Connected to database successfully"))
.catch(err=> console.log(err));

app.use(todoRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
