const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./src/routes');

app.use(cors());
app.use(express.json());

// pakai routes
app.use(routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});