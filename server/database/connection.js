import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/ALLABOUTMERN',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('data base has been connected Successfull');
}).catch((error)=>{
    console.log("Database not connected and error is " + error);
});