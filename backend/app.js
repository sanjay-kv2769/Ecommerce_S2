const express = require('express');
const { default: mongoose } = require('mongoose');
const productRoute = require('./routes/ProductRoutes');
const app = express();
const cors = require('cors');
const RegisterRouter = require('./routes/RegisterRoute');
const LoginRouter = require('./routes/LoginRouter');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoute);
app.use('/api/register', RegisterRouter);
app.use('/api/login', LoginRouter);

app.get('/', (req, res) => {
  res.send('Server is working fine');
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected on PORT:${process.env.PORT}`);
});
