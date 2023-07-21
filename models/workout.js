const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const workoutSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		exercises: [exerciseSchema],
	},
	{
		timestamps: true,
	}
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
