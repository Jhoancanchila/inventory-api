import express from 'express';
import cors from 'cors';
import config from './config/config.js';

//routes
import productRouter from './v1/routes/product.js';

const app = express();
app.use(cors());
app.use(express.json()); //parsear el body a json y poder leerlo
app.disable('x-powered-by'); //deshabilitar header x-powered-by

const PORT = config.port;

productRouter(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});