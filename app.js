const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');  

const app = express();


app.use(cors());
app.use(bodyParser.json());  


app.use('/api/todos', todosRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
