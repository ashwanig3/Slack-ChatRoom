const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    channelName: String,
    createdBy: String,
    members: [{type: Schema.Types.ObjectId}],
    messages: [{type: Schema.Types.ObjectId}]
})

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;