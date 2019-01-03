const Member = require('./../models/Members');

module.exports = {
    joinChannel: (req, res) => {
        const reqBody = req.body;
        const newMember = new Member({
            name: reqBody.name,
            email: reqBody.email
        })
        Member.find({email: reqBody.email}, (err, user) => {
            if(user.length > 0) {
                res.json({
                    msg: "Already a member of this channel",
                    user: user[0]
                })
            } else {
                newMember.save((err, user) => {
                    if(err) {
                        res.json({
                            msg: "Unable to join"
                        })
                    } else {
                        res.json({
                            msg: "joined succefully",
                            user
                        })
                    }
                })
            }
        })
    },
    getAllMembers: (req, res) => {
        Member.find((err, users) => {
            if(err) {
                throw err;
            } else {
                res.json({users})
            }
        })
    }
}