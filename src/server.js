const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Some dummy content');
});

app.listen(3000, () => {
  console.log("application is running on http://localhost:3000/");
})
