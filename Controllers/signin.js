const handleSignin = (req, res, knex, bcrypt) => {
	knex.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const validPassword = bcrypt.compareSync(req.body.password, data[0].hash);
			if (validPassword) {
				return knex.select('*').from('users').where('email', '=', req.body.email)
				.then(user => {
					console.log(user)
					res.json(user[0])
				})
				.catch(err => res.status(400).json('Unable to get user information'))
			}
			else
				res.status(400).json('Wrong Credentials');
		})
		.catch(err => res.status(400).json('User not found in our database'))
}

module.exports = {
	handleSignin: handleSignin
};