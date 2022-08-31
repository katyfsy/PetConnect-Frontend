const express = require ('express');
const axios = require('axios');


const app = express();

//middleware
app.use(express.json());
app.use(express.static('../public'));
app.use(express.urlencoded({extended: true}));

const PORT = 3001 || process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})