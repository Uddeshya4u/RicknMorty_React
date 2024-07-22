const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Connected'))
  .catch((err) => console.error(`Error while coneecting Mongoose ${err}`));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedCharacters: {
    type: [Number],
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
