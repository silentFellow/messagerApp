import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  username: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  transmissionId: {
    type: String
  }
})

export default mongoose.model('messages', messageSchema)