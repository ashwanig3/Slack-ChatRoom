const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    member: [{ref: 'Member'}]
})

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;