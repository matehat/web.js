var express = require('express');
var router = express.Router();
var validator = require('validator');
var pg = require('pg');

function end(res, code, msg) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({msg: msg, code: code}));
}

router.get('/', function(req, res) { res.render('index'); });

router.post('/formateur', function(req, res) {
  var email = req.body.email;
  if (validator.isEmail(email)) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        end(res, 500, 'server error');
        return console.error("Error fetching client from pool", err);
      }
      client.query('INSERT INTO formateurs ( email ) values ( $1 );', [email], function(err) {
        if (err) {
          end(res, 500, 'server error');
          return console.error("Error executing query", err);
        }
        end(res, 201, 'success');
      });
    });
  } else {
    end(res, 406, 'invalid email');
  }
});

router.post('/signup', function(req, res) {
  var email = req.body.email;
  if (validator.isEmail(email)) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        end(res, 500, 'server error');
        return console.error("Error fetching client from pool", err);
      }
      client.query('INSERT INTO signups ( name, email ) values ( $1, $2 );', [req.body.name, email], function(err) {
        if (err) {
          end(res, 500, 'server error');
          return console.error("Error executing query", err);
        }
        end(res, 201, 'success');
      });
    });
  } else {
    end(res, 406, 'invalid email');
  }
});

module.exports = router;
