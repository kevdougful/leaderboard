var express = require('express');
var router = express.Router();

/* Registration page */
router.get('/register', function(req, res) {
//    var db = req.db;
//    var teams = db.get('Teams');
//   teams.find({}, { "sort" : [['Team_Score','desc']] }, function (e, docs) {
//        res.render('register', {
//            
//        });
//
    res.render('register');
});

module.exports = router;