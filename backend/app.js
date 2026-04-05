const express = require('express');
const cors = require('cors');
const qrRoutes = require('./routes/qrRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', qrRoutes);

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
