var express = require('express');
var router = express.Router();

function setPlaces(topten) {
    var place = 1;
    for (var i = 0; i < topten.length; i++) {
        if (i == 0) {
            // First team, so set it to 1st
            topten[i]["Place"] = Number(place);
            topten[i]["Ordinal"] = ordinal(place);
            continue;
        } else {
            if (topten[i]["Team_Score"] < topten[i - 1]["Team_Score"]) {
                // Not tied with previous team
                topten[i]["Place"] = Number(++place);
                topten[i]["Ordinal"] = ordinal(place);
            } else {
                // Tied with previous team
                topten[i]["Place"] = Number(place);
                topten[i]["Ordinal"] = ordinal(place);
            }
        }
    }
    return topten;
}

function ordinal(n) {
	var s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* Raw JSON page */
router.get('/raw', function(req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, { "sort" : [['Team_Score','desc']] }, function (e, docs) {
        docs = setPlaces(docs);
        res.render('raw', {
            "rawjson" : JSON.stringify(docs, null, 2),
        });
    });
});

/* GET home page. */
router.get('/', function (req, res) {
    var db = req.db;
    var teams = db.get('Teams');
    teams.find({}, { "sort" : [['Team_Score','desc']], "limit" : 10 }, function (e, docs) {
        docs = setPlaces(docs);
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