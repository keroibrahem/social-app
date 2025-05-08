const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    gender: { type: String , required: true },
    bio: { type: String, default: '' },
  }, { timestamps: true });
  module.exports = mongoose.model('User', userSchema);