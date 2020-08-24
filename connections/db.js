const mongoose = require("mongoose");

mongoose.connect('',
 {
     useNewUrlParser:true,
     useUnifiedTopology:true

}).then(() => {
    console.warn("DB is connected");
 })
 .catch((err)=>{
     console.warn(err)
 })