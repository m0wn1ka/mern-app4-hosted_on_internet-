const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors());
// app.use(cors({origin: true, credentials: true}));
const mongoose=require('mongoose');
const data = require('./config/default.json');
const mongoURI = data.mongoURI;
const database=()=>{
    const connectionParms={
        // useUnifiedToplogy:true,
        useNewUrlParser:true,
    }
    try{
        mongoose.connect(mongoURI,connectionParms);
console.log("data base connected using new age coder video in appjs file.....");
    }
    catch(err){
        console.log(err.message);
        process.exit(0)
    }
}
database();
//middle ware ,body parser,for allowing access to req object
app.use(express.json({extended:false}));
app.use('/users',require('./routes/api/users'))
app.use('/auth',require('./routes/api/auth'))
// app.get('*', (req, res) => {
//    res.send("the output for get request");
//   });
const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))