const express = require('express');
const Celebrity = require('./../models/celebrity');
const Resource = require('./../models/celebrity');
const router = new express.Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrity) => {
      res.render('celebrities/index', { celebrity: celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/celebrities', (req, res, next) => {
  const data = req.body;

  /*
const myUser = new User({
  name: 'Alice',
  password: 'ironhack2018',
  job: 'Architect'
});

  myUser
    .save() // Create a new user and return a promise
    .then((user) => console.log('The user was created'))
    .catch((error) => console.log('An error occurred', error));

*/

  const newCelebrity = new Celebrity({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  });

  newCelebrity
    .save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(() => {
      res.render('/celebrities/create');
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityDetails) => {
      res.render('celebrities/show', { celebrityDetails });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

/*Locate the /celebrities/create GET route in routes/celebrities.js:
In that route's handler:
Render the celebrities/create view.*/

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const deleteCelebrity = req.params.id;
  Celebrity.findByIdAndDelete(deleteCelebrity).then(() =>
    res.redirect('/celebrities').catch((error) => {
      console.log(error);
      next(error);
    })
  );
});

module.exports = router;
