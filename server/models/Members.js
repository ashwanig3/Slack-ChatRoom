const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    email: String
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;