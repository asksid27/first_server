const Clarifai = require('clarifai');

const app= new Clarifai.App({
  apiKey: '5dd4f1e592324640a36c22334ffd3199'
});

const handleApiCall = (req, res) => {
	app.models.predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with api'));
}

const handleImage = (req, res, knex) => {
	const { id } = req.body;
	knex('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to update the entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};