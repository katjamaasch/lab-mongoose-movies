const express = require('express');
const Celebrity = require('./../models/celebrity');
const Resource = require('./../models/celebrity');
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
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

/*Locate the /celebrities/:id POST route in the routes/celebrities.js file.
In that route's handler:
Create an object with keys for each attribute of a celebrity (celebrity has 3 attributes. What were they again? Look back and review if you forgot).
Values for those keys should come from the form submission (req.body).
Call the Celebrity model’s update static and use the celebrity's id to specify which celebrity we are updating. Pass it the object with the new attributes as the second argument.
If there is an error retrieving that celebrity, call the route's next function and return the error.
If there is no error, redirect back to the list of celebrities*/

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
