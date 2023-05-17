const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('todo',userSchema);