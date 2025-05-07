const express = require('express');
const app = express();
const port = 3001;
// const dummy = require('./dummy.js');
const cors = require('cors');

app.use(cors(), express.json())

app.get('/jokeAccounts', (req, res) => {
  res.status(200).json(dummy);
})

app.put('/JokeAccounts', (req, res) => {
  let url = "https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents/Accounts"
  let body = {
    username: req.body.username,
    password: req.body.password,
    SavedMemes: {}
};

  fetch(`${url}/${body.username}.json`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${req.body.token}`,
        'Content-Type': 'application/json',
        'Accept': "application/vnd.github+json"
    },
    body: JSON.stringify({
      'message': `Created account for ${body.username}`,
      'content': Buffer.from(JSON.stringify(body)).toString('base64'),
    })
  })
  .then(githubResponse => githubResponse.json())
  .then(formatted => {
    res.status(200).json(formatted)
  })
})


app.listen(port, () => {
  console.log('Bottega Server listening on port ' + port);
})
module.exports = app;

