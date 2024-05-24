const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
dotenv.config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-routes');
const errorHandler = require("./middleware/errorhandler");
connectDb();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users',userRouter );
app.use(errorHandler);


app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});