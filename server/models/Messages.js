const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    msg: String,
    memberId: {type: Schema.Types.ObjectId, ref: 'Member'},
    memberName: String
})

const Message = mongoose.model('Message', msgSchema);

module.exports = Message;