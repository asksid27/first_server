const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'P0STgreS',
		database: 'react-face'
	}
})
const image = require('./Controllers/image');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');

const app = express();

// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'test0',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '1234',
// 			name: 'Sid',
// 			email: 'sid@gmail.com',
// 			password: 'test',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)});
//bcrypt.compare(password, hash, function(err, res){console.log(res)})

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	// let found = false;
	knex.select('*').from('users').where({ id: id })
		.then(user => {
			console.log(user)
			if(user.length)
				res.json(user[0])
			else
				res.status(400).json('User not found')
		});
	// if(!found){
	// 	res.status(404).json('User does not exist');
	// }
});

app.put('/image', (req, res) => {image.handleImage(req, res, knex)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} );

app.listen(process.env.PORT || 3001, () => {
	console.log('App is working fine');
});


