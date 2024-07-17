const express = require('express')
const mongoose = require('mongoose')
const Chat = require('./models/chat')

main().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from:'neha',
        to:'priya',
        msg:'send me your notes.',
        created_at:new Date()
    },
    {
        from:'neha',
        to:'Shraddha',
        msg:'send me your questions.',
        created_at:new Date()
    },
    {
        from:'neha',
        to:'pratik',
        msg:'How are you?',
        created_at:new Date()
    },
    {
        from:'pratik',
        to:'sagar',
        msg:'send me your mobile number.',
        created_at:new Date()
    }
]

Chat.insertMany(allChats)



