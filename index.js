const express = require('express')
const mongoose = require('mongoose')
const app = express();
const path = require('path')
const Chat = require('./models/chat')
const methodOverride = require("method-override");

const port = 8080;

app.set(path.join(__dirname,"views"))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
} 

app.listen(port,()=> {
    console.log(`Listening on port ${port}`)
})

app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.get('/chats',async (req,res)=> {
    let chats = await Chat.find();
    // console.log(chats)
    res.render('index.ejs',{chats})
    // res.send("Chats Working")
})

app.post('/chats',async (req,res)=> {
    let {from,to,msg} = req.body;

    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    })

    newChat.save().then(()=>{
        console.log("data was send")
    })
    .catch((err)=> console.log(err))

    // console.log(newChat)

    res.redirect('/chats')
})

app.get('/chats/new',async (req,res)=> {
    res.render('new.ejs')
    // res.send("Chats Working")
})

app.get('/chats/:id/edit',async (req,res)=> {
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render('edit.ejs',{chat})
    // res.send("Chats Working")
})

app.put("/chats/:id",async (req,res)=> {
    let {id } = req.params;
    let {msg:newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true}
    )
    // console.log(updatedChat)
    res.redirect("/chats");

})

app.delete("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat)
    res.redirect("/chats")
})

// const chat1 = new Chat({
//     from:'neha',
//     to:'priya',
//     msg:'send me your notes.',
//     created_at:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res)
// })