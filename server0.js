
/* This is old way of using http server on node
// const http = require('http');

// const server = http.createServer((request, response) => {
// 	console.log('header', request.headers);
// 	console.log('method', request.method);
// 	console.log('url', request.url);
// 	const user = {
// 		name: 'Siddhant',
// 		hobby: 'Football'
// 	}

// 	response.setHeader('Content-Type', 'application/json');
// 	response.end(JSON.stringify(user));
// })

// server.listen(3001);*/


//new express way
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.get('/profile', (req, res) => {
// 	res.send("getting profile");
// })

/*MIDDLEWARE*/
// app.use((req, res, next) => {
// 	console.log('Hello');
// 	next();
// })
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.post('./profile', (req, res) => {
	console.log(req.body);

})

app.get('/', (req, res) => {
	const user  = {
		name: 'Siddhant',
		hobby: 'Football'
	}
	res.send(user);
})
app.listen(3001);