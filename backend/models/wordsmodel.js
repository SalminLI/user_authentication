import mongoose from "mongoose";
 
const TransSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  w_id: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  trans: {
    type: String,
    required: true,
  }
});
 
const WordsModel = mongoose.model("words", TransSchema);

export default WordsModel;
