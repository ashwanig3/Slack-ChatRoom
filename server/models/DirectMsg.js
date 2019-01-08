const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectMsgSchema = new Schema({
    msg: String,
    from: {type: Schema.Types.ObjectId, ref: 'Member'},
    to: {type: Schema.Types.ObjectId, ref: 'Member'},
    author: String
})

const DirectMsg = mongoose.model('DirectMsg', DirectMsgSchema );

module.exports = DirectMsg;