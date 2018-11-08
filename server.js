const express = require('express');
const app = express();
app.use(express.static('./')); //so that root displays index.html
app.use(express.json());

app.get('/', (request, response) => {
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Express running');
});
