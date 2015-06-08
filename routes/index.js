var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, { "sort" : [['Team_Score','desc']] }, function (e, docs) {
        res.render('index', {
            "teamlist" : docs,
            "event" : "Event Name"
        });
    });
    //res.render('index', { title: 'Express' });
});

/* ADD Team */
router.get('/edit', function (req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, { "sort" : [['Team_Number','asc']] }, function (e, docs) {
        res.render('edit', {
            "teamlist" : docs,
            "event" : "Event Name"
        });
    });
});

router.post('/addteam', function (req, res) {
    var db = req.db;

    var captain = req.body.teamcaptain;
    var t_number = req.body.teamnumber;
    var score = req.body.teamscore;

    var teams = db.get('Teams');

    teams.insert({
        "Team_Captain" : captain,
        "Team_Number" : Number(t_number),
        "Team_Score" : Number(score)
    }, function (err, doc) {
        if (err) {
            res.send("Error sending to database");
        }
        else {
            res.location("/edit");
            res.redirect("/edit");
        }
    });
});

/* EDIT Team */
router.post('/editteam', function(req, res) {
    var db = req.db;
    
    // Get query string contents
    var hash = req.body.hash;
    var t_number = req.body.number;
    var captain = req.body.captain;
    var score = req.body.score; 
    
    var teams = db.get('Teams');
    
    teams.update({
        _id: hash 
    }, { 
        Team_Number: Number(t_number), 
        Team_Captain: captain, 
        Team_Score: Number(score)
    }, function(err, doc) {
        if (err) {
            res.send("Error updating database");
        }
        else {
            res.location("/");
            res.redirect("/");
        }
    });
});

/* REMOVE Team */
router.post('/delete', function(req, res) {
   var db = req.db;
   
   // Get query string contents
   var hash = req.body.hash;
   
   // Get collection from db
   var teams = db.get('Teams');
   
   teams.remove({
       _id: hash
   }, function(err, removed) {
       if (err) {
           res.send("Error removing from database");
       }
       else {
           res.location("/");
           res.redirect("/");
       }
   });
});

module.exports = router;