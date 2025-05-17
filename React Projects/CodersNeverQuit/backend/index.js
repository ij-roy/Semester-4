const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST request received');
});
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

