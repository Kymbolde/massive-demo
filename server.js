var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive')


var app = express();
app.use(bodyParser.json());

var port = 3000;

var conn = massive.connectSync({
  connectionString : "postgres://postgres:@localhost/massive_demo"
});

app.set('db', conn);

var db = app.get('db');

// app.get('/incidents', function(req, res) {
//   db.get_all_incidents(function (err, incidents) {
//   	console.log(incidents);
//   	res.send(incidents)
//   })
// });

app.get('/incidents', function(req, res) {
	var cause = req.query.cause
	if (cause) {
		db.get_incidents_by_cause([cause], function(err, incidents) {
			res.status(200).send(incidents);
		})
	}
	else {
		db.get_all_incidents(function (err, incidents) {
	  	res.status(200).send(incidents)
	  })	
	}
})

app.post('/incidents', function(req, res) {
	var incident = req.body;
	var values = [incident.us_state, incident.injury_id, incident.cause_id]
	db.insert_new_data(values, function (err, response) {
		if (!err) {
			res.status(200).send(response);
		}
		else {
			res.status(422).send(response);
		}
	})
});

app.listen(port, function() {
  console.log("Started server on port", port);
});









