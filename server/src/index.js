// imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import Pusher from 'pusher'
dotenv.config();

import { messageRouter } from './router/messageRouter.js';

// app configs
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3333

// pusher
const pusher = new Pusher({
  appId: "1573184",
  key: "f0cbca4576ec2711112e",
  secret: "e5c97bc683f361e7a6b7",
  cluster: "ap2",
  useTLS: true
});

// mongoose
mongoose.connect(process.env.MONGOOSE_ID)
const db = mongoose.connection

db.once('open', () => {
  console.log('yo! your data base is connected');

  const msgCollection = db.collection("messages")
  const changeStream = msgCollection.watch()

  changeStream.on("change", (change) => {
    console.log('a change is occured')
    if(change.operationType === "insert") {
      const messageDetails = change.fullDocument
      pusher.trigger("messages", "inserted", {
        username: messageDetails.username, 
        message: messageDetails.message, 
        date: messageDetails.date,
        time: messageDetails.time,
        transmissionId: messageDetails.transmissionId
      })
      console.log(messageDetails)
    }
    else if(err) {
      console.log(err)
    }
  })
})

app.get('/', (req, res) => console.log('hi'))

app.use('/msg', messageRouter)

// listener
app.listen(PORT, () => console.log(`app started at https://messagerapp.onrender.com`))