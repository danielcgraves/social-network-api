const { User, Thought } = require('../models');

module.exports = {
	getThoughts(req, res) {
		Thought.find({})
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},

	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	createThought(req, res) {
		Thought.create(req.body).then(({ _id }) => {
			return User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: _id } },
				{ new: true }
			);
		});
	},

	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No thought with this id' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought find with this ID!' })
					: User.findOneAndUpdate(
							{ thoughts: req.params.thoughtId },
							{ $pull: { thoughts: req.params.thoughtId } },
							{ new: true }
					  )
			)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'Thought deleted, but no user found' })
					: res.json({ message: 'Thought successfully deleted' })
			)
			.catch((err) => res.status(500).json(err));
	},

	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought found with this ID!' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: req.params.reactionId } },
			{ new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought found with this ID!' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};