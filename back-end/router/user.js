const router = require('express').Router();
let User = require('../model/account.model');

router.route('/').get(function(req, res){
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post(function(req, res){
    const username = req.body.name;
    const password = req.body.pass;
  
    const newUser = new User({username,password});
  
    newUser.save()
      .then(function(){ return res.json('User added!')})
      .catch(function(err) {return res.status(400).json('Error: ' + err)});
  });
  
  module.exports = router;