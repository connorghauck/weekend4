var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rhoweekend4'
}

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM tasks ORDER BY markedcomplete, LOWER(task);', function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

router.post('/', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO tasks (task, markedcomplete) ' +
      'VALUES ($1, $2);',
      [req.body.listItem, req.body.checkedOff],
      function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }
        console.log(result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

router.put('/update', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      if (req.body.checked == 'true') {
        req.body.checked = false;
      } else {
        req.body.checked = true;
      }

      client.query('UPDATE tasks SET markedcomplete=$1 WHERE id=$2;',
      [req.body.checked, req.body.id],
      function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM tasks WHERE id = $1;', [id], function(err, result) {
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
