const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    msg: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    username: String
})

const Message = mongoose.model('Message', msgSchema);

module.exports = Message;