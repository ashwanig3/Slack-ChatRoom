const Message = require('./../models/Messages');
const Member = require('./../models/Members');


module.exports = {
    postMsg: (req, res) => {
        const msgBody = req.body;
        const newMsg = new Message({
            msg: msgBody.msg,
            memberId: msgBody.memberId,
            memberName: msgBody.memberName
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