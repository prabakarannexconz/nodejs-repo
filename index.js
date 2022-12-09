//ThirdParty Modeule

const express = require ('express')
const app = express()
const morgan= require('morgan')
const uuid= require('uuid')
const mongoose = require('mongoose')
require('dotenv/config')



//Middleware
// app.use((req,res,next)=>{
//     console.log("i am middleware");
//     next();
// })
app.use(morgan('dev'))

//Body paser
app.use(express.json())

//Router
const Personrouter = require('./PersonsRoute')
app.use('/persons',Personrouter) 
 
const myPersons=
[
    {
        id:uuid.v4(),
        name:'praba',
        age:34
    },
    {
        id:uuid.v4(),
        name:'karan',
        age:33
    },
    {
        id:uuid.v4(),
        name:'raja',
        age:35
    },
]


//get all person
app.get('/',(req,res)=>{
    res.status(200).json(myPersons)
})

//GET id
app.get('/:id',async(req,res)=>{
    // res.json(req.params.id)
    // res.send("Hai Friends");
    const getOne = await myPersons.filter(e=>e.id === req.params.id)
    res.status(200).json(getOne)
})

//post persons
app.post('/',async(req,res)=>{
    // console.log(req.body)
    myPersons.push(req.body)
    res.status(200).json(req.body)
    //  const getOne = await myPersons.filter(e=>e.id === req.params.id)
    // res.status(200).json(getOne)
})

//about
app.get('/about',(req,res)=>{
    res.status(400).json(myPersons);
})

app.listen(2000,()=>{
    console.log("server is running 2000");
})



//database server create connect

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MYCONN,(err)=>{
    if(err){console.log('DB not connected');}
    console.log('DB connected successfully');
})