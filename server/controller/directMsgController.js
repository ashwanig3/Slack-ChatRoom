const DirectMsg = require('./../models/DirectMsg')

module.exports = {
    postDirectMsg: (req, res) => {
        const reqBody = req.body;
        const newMsg = new DirectMsg({
            msg: reqBody.msg,
            from: reqBody.from,
            to: reqBody.to
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
        DirectMsg.find({from: msgFrom, to: msgTo}, (err, allMsg) => {
            console.log(allMsg)
            if(err) throw err;
            res.json({allMsg})
        })
    }
}