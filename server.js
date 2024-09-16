const express = require('express');  
const app = express();   
const port = 4000;            

app.use(express.json());
app.use('/api/categories', require("./routes/categories"));
app.use('/api/authors', require("./routes/authors"));
app.use('/api/books', require("./routes/books"));



app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
  