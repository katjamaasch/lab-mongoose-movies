const express = require('express');
const { find } = require('./../models/movie');
const Movie = require('./../models/movie');
const router = new express.Router();

router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies: movies });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('movies/create');
});

//the route is dependent on the path (action) I specify in the form in the hbs file!
router.post('/', (req, res, next) => {
  const data = req.body;
  const newMovie = new Movie({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  });
  newMovie
    .save()
    .then((addedmovie) => {
      //render is taking a view and rendering it. When I want to show a page with a URL like here, I need to use redirect
      res.redirect(`/movies/${addedmovie._id}`);
    })
    .catch((error) => next(error));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((singlemovie) => {
      res.render('movies/show', { singlemovie: singlemovie });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Movie.findByIdAndUpdate(id, {
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((singleMovie) => {
      res.render('movies/edit', { singleMovie });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id).then(() => {
    res.redirect('/movies');
  });
});

module.exports = router;
