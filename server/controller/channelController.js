const Channel = require('./../models/Channel')

module.exports = {
    addChannels: (req, res) => {
        const reqBody = req.body;
        const newChannel = new Channel({
            channelName: reqBody.channelName,
            createdBy: reqBody.createdBy,
            members:[reqBody.createdBy]
        })
        newChannel.save(err => {
            if(err) throw err;
            Channel.find({}, (err, channels) => {
                res.json({ channels })    
            })
            
        })
    },
    getAllChannels: (req, res) => {
        Channel.find((err, allChannels) => {
            if(err) throw err;
            res.json({allChannels})
        })
    }
}