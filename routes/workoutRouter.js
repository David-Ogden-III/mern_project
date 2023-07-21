const express = require('express');
const Workout = require('../models/workout');
const workoutRouter = express.Router();

workoutRouter
	.route('/')
	.get((req, res, next) => {
		Workout.find()
			.then((workouts) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(workouts);
			})
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Workout.create(req.body)
			.then((workout) => {
				console.log('Workout Created ', workout);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(workout);
			})
			.catch((err) => next(err));
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /workouts');
	})
	.delete((req, res) => {
		res.statusCode = 403;
		res.end('DELETE operation not supported on /workouts');
	});

workoutRouter
	.route('/:workoutId')
	.get((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(workout);
			})
			.catch((err) => next(err));
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end(
			`POST operation not supported on /workouts/${req.params.workoutId}`
		);
	})
	.put((req, res, next) => {
		Workout.findByIdAndUpdate(
			req.params.workoutId,
			{
				$set: req.body,
			},
			{ new: true }
		)
			.then((workout) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(workout);
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Workout.findByIdAndDelete(req.params.workoutId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

workoutRouter
	.route('/:workoutId/exercises')
	.get((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				if (workout) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(workout.exercises);
				} else {
					err = new Error(`Workout ${req.params.workoutId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				if (workout) {
					workout.exercises.push(req.body);
					workout
						.save()
						.then((workout) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(workout);
						})
						.catch((err) => next(err));
				} else {
					err = new Error(`Workout ${req.params.workoutId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(
			`PUT operation not supported on /workouts/${req.params.workoutId}/exercises`
		);
	})
	.delete((req, res) => {
		res.statusCode = 403;
		res.end(
			`Delete operation not supported on /workouts/${req.params.workoutId}/exercises`
		);
	});

workoutRouter
	.route('/:workoutId/exercises/:exerciseId')
	.get((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				if (workout && workout.exercises.id(req.params.exerciseId)) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(workout.exercises.id(req.params.exerciseId));
				} else if (!workout) {
					err = new Error(`Workout ${req.params.workoutId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Exercise ${req.params.exerciseId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end(
			`POST operation not supported on /workouts/${req.params.workoutId}/exercises/${req.params.exerciseId}`
		);
	})
	.put((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				if (workout && workout.exercises.id(req.params.exerciseId)) {
					if (req.body.name) {
						workout.exercises.id(req.params.exerciseId).name = req.body.name;
					}
					if (req.body.weight) {
						workout.exercises.id(req.params.exerciseId).weight =
							req.body.weight;
					}
					if (req.body.reps) {
						workout.exercises.id(req.params.exerciseId).reps = req.body.reps;
					}
					workout
						.save()
						.then((workout) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(workout);
						})
						.catch((err) => next(err));
				} else if (!workout) {
					err = new Error(`Workout ${req.params.workoutId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Exercise ${req.params.exerciseId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Workout.findById(req.params.workoutId)
			.then((workout) => {
				if (workout && workout.exercises.id(req.params.exerciseId)) {
					workout.exercises.id(req.params.exerciseId).remove();
					workout
						.save()
						.then((workout) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(workout);
						})
						.catch((err) => next(err));
				} else if (!workout) {
					err = new Error(`Workout ${req.params.workoutId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Exercise ${req.params.exerciseId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	});
module.exports = workoutRouter;
