const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const indexRouter = require("./routes/router.js")

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use("/api", indexRouter);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});