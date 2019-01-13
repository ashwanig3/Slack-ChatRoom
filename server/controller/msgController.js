const Message = require('./../models/Messages');


module.exports = {
    postMsg: (req, res) => {
        console.log(req.body)
        const msgBody = req.body;
        const newMsg = new Message({
            msg: msgBody.msg,
            userId: msgBody.userId,
            username: msgBody.username
        })
        newMsg.save((err, msg) => {
            if(err) {
                throw err
            } else {
                res.json({
                    msg: "post successful"
                })
            }
        })
    },
    getMessage: (req, res) => {
        Message.find((err, allMsg) => {
            if(err) throw err;
            res.json({
                allMsg  
            })
        })
    }

}