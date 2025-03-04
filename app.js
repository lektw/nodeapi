const express = require('express');
const routes = require('./Routes/routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});