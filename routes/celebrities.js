const express = require('express');
const Movie = require('../models/movie');
const Celebrity = require('./../models/celebrity');
const router = new express.Router();

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrity) => {
      res.render('celebrities/index', { celebrity: celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  const newCelebrity = new Celebrity({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  });

  newCelebrity
    .save()
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch(() => {
      res.render('/celebrities/create');
    });
});

router.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});


router.get('/:id', (req, res, next) => {
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

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Celebrity.findByIdAndUpdate(id, {
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const deleteCelebrity = req.params.id;
  Celebrity.findByIdAndDelete(deleteCelebrity)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((singleCelebrity) => {
      res.render('celebrities/edit', { singleCelebrity });
    })
    .catch((error) => {
      next(error);
    });

  /*Call the Celebrity model’s findOne or findById static to retrieve a specific celebrity by their id.
If there's an error, call the route's next function and return the error.
If there isn't an error, render the celebrities/edit view.
Pass the variable with the celebrity’s details into the view.
Create the edit.hbs view file inside the views/celebrities/ folder.*/
});

module.exports = router;
