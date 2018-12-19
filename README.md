# deadpeople

### CPSC 376 Digital Humanities Final Project
Claire, Elle, Michaela, Shea

A visual mapping and database interface for an active archive of the Grove Street Cemetery.

#### To run on localhost:
pull or download,
in project directory in terminal run:
`cd vue_src && npm run build && cd ../node_src && node server.js`

#### To run on heroku:
go to https://deadpeople.herokuapp.com/

#### Dependencies
In node_src:
```
"dependencies": {
	"cas-authentication": "0.0.8",
	"connect-ensure-login": "^0.1.1",
	"express": "^4.16.4",
	"express-session": "^1.15.6",
	"leaflet": "^1.3.4",
	"passport": "^0.4.0",
	"passport-cas": "^0.1.1",
	"path": "^0.12.7",
	"pg": "^7.6.1",
	"vue-router": "^3.0.2"
}
```
In vue_src:
```
"dependencies": {
	"bootstrap-vue": "^2.0.0-rc.11",
	"leaflet": "^1.3.4",
	"vue": "^2.5.17",
	"vue-router": "^3.0.2"
},
```

Note: database entries and deletions are only allowed from localhost