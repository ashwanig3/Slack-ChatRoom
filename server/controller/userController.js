const User = require('../models/User');
const passport = require('passport');

module.exports = {
    signUp: (req, res) => {
        const userData = req.body;

        if(!userData.name || !userData.password || !userData.username) {
          return res.status(400).send({ message: "Name, Username and password are must." })
        }

        if(userData.username.length < 5) {
          return res.status(400).send({ message: "Username must be greater than" })
        } else {
          const newUser = new User(userData);	
        
          User.find({username : userData.username}, (err, data) => {
            if(data.length) {
              res.writeHead(200, {"Content-TypUpdates.controller.addPoste": "application/json"});
              res.end(JSON.stringify({
                msg : "username is not available"
              }));
            } else {
              newUser.save((err, data) => {
                if(err) {
                  res.json({
                    msg : "Input Valid Credentials"
                  })
                } else {
                  res.json({
                    responseStatus : "200",
                    msg : "Signup Successfully"
                  })
                }
              })
            }
          })
        } 
      },
      logIn: (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
          console.log(user)
          if (err) { return next(err); }
          if (!user) { 
            return res.status(404).json({
              msg: 'Invalid Username or Password'
            }) 
          }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).json({
              user 
            })
          });
        })(req, res, next);
      },
      whoAmI : (req, res) => {
        if(req.user) {
          User.findOne({_id : req.user._id}, (err, data) => {
            if(data) {
              res.json({
                user : data
              })
            } else {
              res.status(404).json({
                msg : "Please Sign Up. You are not logged in."
              })
            }
          })
        }
      },
      logout:(req, res) => {
        req.session.destroy();
        res.status(200).json({
          msg : "Session is removed"
        })
      }
    }