const express = require('express');
const cors = require('cors');

const jogosRouter = require('./routes/jogos.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/jogos', jogosRouter);




const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})