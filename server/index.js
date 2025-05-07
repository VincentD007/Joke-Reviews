const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors(), express.json())


app.put('/JokeAccounts', (req, res) => {
  let url = "https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents/Accounts"
  let updatedata = req.body.updatedata;
  let body = {
      username: req.body.username,
      SavedMemes: !updatedata ? []: updatedata.memes
    };

  let bodyToEncode = {
    'message': !updatedata ? `Created account for ${body.username}`: `Account update for ${body.username}`,
    'content': Buffer.from(JSON.stringify(body)).toString('base64'),
  }

  if (!!updatedata) {
    bodyToEncode['sha'] = req.body.updatedata.sha;
  };
  console.log(bodyToEncode)
  let encodedBody = JSON.stringify(bodyToEncode)
    
  fetch(`${url}/${body.username}.json`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${req.body.token}`,
        'Content-Type': 'application/json',
        'Accept': "application/vnd.github+json"
    },
    body: encodedBody
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
