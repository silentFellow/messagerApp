import express from 'express'
import Messages from '../models/messageModel.js'

const router = express.Router();

router.post('/send', async (req, res) => {
  const newMessage = req.body

  try {
    await Messages.create(newMessage)
    res.status(200).send('successful')
  }
  catch(err) {
    res.send(err)
  }
})

router.get('/receive', async (req, res) => {
  try {
    const msg = await Messages.find( { transmissionId: req.query.transmissionId } )
    res.status(200).send(msg)
  }
  catch(err) {
    res.send(err)
  }
})

export { router as messageRouter }