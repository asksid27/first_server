const handleRegister = (req, res, knex, bcrypt) => {
	const { email, name, password } = req.body;
	// brcypt.hash(password ,null, null, function(err, hash){
	// 	console.log(hash);
	// })
	if ( !email || !name || !password){
		return res.status(400).json('Incorrect Data');
	}
	const hash = bcrypt.hashSync(password);
		knex.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(dbemail => {
				return trx('users').returning('*').insert({
					email: dbemail[0],
					name: name,
					joined: new Date()
				})
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
	.catch(err => res.status(400).json('Unable to register'))	
}

module.exports = {
	handleRegister: handleRegister
};