var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, {}, function (e, docs) {
        res.render('index', {
            "teamlist" : docs
        });
    });
    //res.render('index', { title: 'Express' });
});

/* ADD Team */
router.get('/addteam', function (req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, { "sort" : [['Team_Score','desc']] }, function (e, docs) {
        res.render('addteam', {
            "teamlist" : docs
        });
    });
});

router.post('/addteam', function (req, res) {
    var db = req.db;

    var captain = req.body.teamcaptain;
    var number = req.body.teamnumber;
    var score = req.body.teamscore;

    var teams = db.get('Teams');

    teams.insert({
        "Team_Captain" : captain,
        "Team_Number" : Number(number),
        "Team_Score" : Number(score)
    }, function (err, doc) {
        if (err) {
            res.send("Error sending to database");
        }
        else {
            res.location("/addteam");
            res.redirect("/addteam");
        }
    });
});

module.exports = router;