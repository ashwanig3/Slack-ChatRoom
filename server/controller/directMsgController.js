const DirectMsg = require('./../models/DirectMsg')

module.exports = {
    postDirectMsg: (req, res) => {
        const reqBody = req.body;
        const newMsg = new DirectMsg({
            msg: reqBody.msg,
            from: reqBody.from,
            to: reqBody.to,
            author: reqBody.author
        })
        newMsg.save((err) => {
            if(err) throw err;
            res.json({
                msg: "post success"
            })
        })
    },
    getDirectMsg: (req, res) => {
        const msgFrom = req.params.from;
        const msgTo = req.params.to;
    DirectMsg.find({
        $or: [
            {from: msgFrom, to: msgTo},
            {from: msgTo, to: msgFrom}
        ]
    }, (err, allMsg) => {
        if(err) throw err;
        res.json({allMsg})
    })
    }
}