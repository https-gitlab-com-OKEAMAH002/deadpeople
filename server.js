const express = require('express');
const app = express();
app.use(express.static('./')); //so that root displays index.html
app.use(express.json());

dburl = process.env.DATABASE_URL || "<DB_URI>";

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: dburl,
	ssl: true
});

app.get('/', (request, response) => {
});

// ADMIN ONLY -- ONE-TIME INITIALIZATION OF TABLES IN DATABASE
app.get('/db-init-tables', async (req, res) => {
	try {
		const client = await pool.connect()
		await client.query('CREATE TABLE objects(object_id SERIAL PRIMARY KEY, type VARCHAR(40), location VARCHAR(40));');
		await client.query('CREATE TABLE graves(object_id INTEGER PRIMARY KEY, last_name VARCHAR(40), first_name VARCHAR(40), middle_name VARCHAR(40), date_of_birth DATE, date_of_death DATE, date_of_burrial DATE, is_notable BOOLEAN);');
		await client.query('CREATE TABLE landmarks(object_id INTEGER PRIMARY KEY, description VARCHAR(500), has_photos BOOLEAN);');
		client.release();
		console.log("Initialized tables");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

// ADMIN ONLY -- PERMANENTLY DELETE ONE OF THE TABLES
app.get(RegExp('/db-delete-table/(objects|graves|landmarks)'), async (req, res) => {
	try {
		const client = await pool.connect()
		await client.query('DROP TABLE ' + req.originalUrl.substring(String("/db-delete-table/").length) + ';');
		client.release();
		console.log("Deleted table: ", req.originalUrl.substring(String("/db-delete-table/").length));
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

app.get('/db-test-create', async (req, res) => {
	try {
		const client = await pool.connect()
		await client.query('CREATE TABLE test_table(id SERIAL PRIMARY KEY, name VARCHAR(40));');
		await client.query('INSERT INTO test_table VALUES(1, \'hello\');');
		client.release();
		console.log("created test_table");
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
