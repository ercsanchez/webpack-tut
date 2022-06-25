const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', function(req, res) {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
  const contentFromHtml = fs.readFileSync(pathToHtmlFile, 'utf-8');
  // res.send('Some dummy content');
  res.send(contentFromHtml);
});

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log("application is running on http://localhost:3000/");
})
