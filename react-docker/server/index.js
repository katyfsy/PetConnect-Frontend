const express = require ('express');
const axios = require('axios');


const app = express();

//middleware
app.use(express.json());
app.use(express.static('../public'));
app.use(express.urlencoded({extended: true}));

const PORT = 3000 || process.env.PORT;


app.get('/API', (req, res) => {
  // console.log('received get request', req);
  axios({
    method: 'GET',
    url: 'http://localhost:8080/api/petSearch',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then ((res) => {
    return res
  })
  .then( data => {
    console.log('success')
    res.json(data);
  })
  .catch((error) => {
    res.send(error)
  })
})



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})