const express = require('express');
const path = require('path');
const session = require('express-session');
const cas = require('./config/cas.js');
const app = express();

/*
 *	Database configuration
*/
dburl = process.env.DATABASE_URL || "<DB_URI>";
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: dburl,
	ssl: true
});

/*
 *	App configuration
*/
var host = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 3000;
var sessionSecret = process.env.SESSION_SECRET || 'e70a1e1ee4b8f662f78';

// app.use(express.static('../vue_src/dist/'));
app.use("/js", express.static('../vue_src/dist/js'));
app.use("/css", express.static('../vue_src/dist/css'));

app.use(express.json());


/*
* Authentication Set Up
*/

// Set up an Express session, which is required for CASAuthentication.
// 1 week duration, extended by a week each time they log in.
var duration = 24 * 60 * 60 * 7 * 1000;
app.use(session({
	cookieName: 'session',
	secret: sessionSecret,
	resave: false,
	saveUninitialized: false,
	duration: duration,
	activeDuration: duration
}));

var auth = cas(host, port);

// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
app.get('/logout', auth.logout);

// Small middleware that sets the CAS auth service_url on first request.
app.use(auth.checkServiceURL);

// Add authentication to all route
app.use(auth.bounce)

/*
 *	Routing
*/
app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname + '/../vue_src/dist/index.html'));
});

// ADMIN ONLY -- ONE-TIME INITIALIZATION OF TABLES IN DATABASE
app.get('/db-init-tables', async (req, res) => {
	try {
		const client = await pool.connect();
		await client.query('CREATE TABLE objects(object_id SERIAL PRIMARY KEY, type VARCHAR(40), location VARCHAR(40));');
		await client.query('CREATE TABLE graves(object_id INTEGER PRIMARY KEY, last_name VARCHAR(40), first_name VARCHAR(40), middle_name VARCHAR(40), date_of_birth DATE, date_of_death DATE, date_of_burrial DATE, is_notable BOOLEAN);');
		await client.query('CREATE TABLE landmarks(object_id INTEGER PRIMARY KEY, description VARCHAR(500), has_photos BOOLEAN);');
		client.release();
		console.log("Initialized tables");
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

// ADMIN ONLY -- PERMANENTLY DELETE ONE OF THE TABLES
app.get(RegExp('/db-delete-table/(objects|graves|landmarks)'), async (req, res) => {
	try {
		const client = await pool.connect();
		await client.query('DROP TABLE ' + req.originalUrl.substring(String("/db-delete-table/").length) + ';');
		client.release();
		console.log("Deleted table: ", req.originalUrl.substring(String("/db-delete-table/").length));
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-add-grave', async (req, res) => {
	try {
		const client = await pool.connect();
		await client.query('INSERT INTO objects(object_id, type, location) VALUES(DEFAULT, \'' + req.query.type + '\', \'' + req.query.location + '\');');
		let result = await client.query('SELECT object_id FROM objects WHERE location=\'' + req.query.location + '\' AND type=\'' + req.query.type + '\';');
		objectId = result.rows[0].object_id;
		await client.query('INSERT INTO graves(object_id, last_name, first_name, middle_name, date_of_birth, date_of_death, date_of_burrial) VALUES(' + objectId + ', \'' + req.query.lastName + '\', \'' + req.query.firstName + '\', \'' + req.query.middleName + '\', \'' + req.query.DOBirth + '\', \'' + req.query.DODeath + '\', \'' + req.query.DOBurial + '\');');
		client.release();
		console.log("Added grave for query: ", req.query);
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-add-landmark', async (req, res) => {
	try {
		const client = await pool.connect();
		await client.query('INSERT INTO objects(object_id, type, location) VALUES(DEFAULT, \'' + req.query.type + '\', \'' + req.query.location + '\');');
		let result = await client.query('SELECT object_id FROM objects WHERE location=\'' + req.query.location + '\' AND type=\'' + req.query.type + '\';');
		objectId = result.rows[0].object_id;
		await client.query('INSERT INTO landmarks(object_id, description, has_photos) VALUES('+ objectId +', \'' + req.query.description + '\', \'' + req.query.hasPhotos + '\');');
		client.release();
		console.log("Added landmark for query: ", req.query);
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-view-objects', async (req, res) => {
	try {
		const client = await pool.connect();
		let query = await client.query('SELECT * FROM objects;');
		console.log("Current objects: ", query.rows);
		client.release();
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-delete-object', async (req, res) => {
	try {
		const client = await pool.connect();
		let result = await client.query('SELECT object_id FROM objects WHERE location=\'' + req.query.location + '\' AND type=\'' + req.query.type + '\';');
		objectId = result.rows[0].object_id;
		await client.query('DELETE FROM objects WHERE object_id=\'' + objectId + '\';');
		if (req.query.type == "Grave") {
			await client.query('DELETE FROM graves WHERE object_id=\'' + objectId + '\';');
		} else if (req.query.type == "Landmark") {
			await client.query('DELETE FROM landmarks WHERE object_id=\'' + objectId + '\';');
		}
		client.release();
		console.log("Deleted object for query: ", req.query);
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

// TESTING

app.get('/db-test-create', async (req, res) => {
	try {
		const client = await pool.connect();
		await client.query('CREATE TABLE test_table(id SERIAL PRIMARY KEY, name VARCHAR(40));');
		await client.query('INSERT INTO test_table VALUES(1, \'hello\');');
		client.release();
		console.log("created test_table");
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-test-log', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM test_table;');
		console.log("logging test_table: ", result);
		client.release();
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-test-delete', async (req, res) => {
	try {
		const client = await pool.connect();
		const query = await client.query('DROP TABLE test_table;');
		client.release();
		console.log("deleted test_table");
		res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.listen(port, host, () => {
  console.log('Express running');
});
