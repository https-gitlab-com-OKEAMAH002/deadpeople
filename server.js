const express = require('express');
const app = express();
const session = require('express-session');
const login = require('connect-ensure-login');
var cas = require('./cas.js');

/*
 *	App configuration
*/
app.use(express.static('./')); //so that root displays index.html
app.use(express.json());
app.use(session(
	{secret: "cats",
	resave: false,
	saveUninitialized: true}));


/*
 *	Database configuration
*/
dburl = process.env.DATABASE_URL || "<DB_URI>";
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: dburl,
	ssl: true
});


let host = process.env.IP || '0.0.0.0';
let port = process.env.PORT || 3000;

let auth = cas(host, port);

// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
app.get('/logout', auth.logout);

// Small middleware that sets the CAS auth service_url on first request.
app.use(auth.checkServiceURL);

// All other routes require CAS authorization
app.use(auth.bounce);

/*
 *	Routing
*/
app.get('/', (request, response) => {
});



// // Call back for authentication
// app.get('/auth/github/callback', 
//   passport.authenticate('github', {failureRedirect: '/login' }),
//   function(req, res) {
//   	if (req.session.returnTo != undefined){
//   		res.redirect(req.session.returnTo);
//   	} else {
//     	res.redirect('/');
//     }
// });

app.get('/db-test-create', async (req, res) => {
	try {
		const client = await pool.connect()
		await client.query('CREATE TABLE test_table(id SERIAL PRIMARY KEY, name VARCHAR(40));');
		await client.query('INSERT INTO test_table VALUES(1, \'hello\');');
		client.release();
		console.log("created test_table")
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-test-log', async (req, res) => {
	try {
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM test_table;');
		console.log("logging test_table: ", result);
		client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-test-delete', async (req, res) => {
	try {
		const client = await pool.connect()
		const query = await client.query('DROP TABLE test_table;');
		client.release();
		console.log("deleted test_table");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Express running');
});
