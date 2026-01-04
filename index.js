const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());



app.use(express.json());

// router
const bookRoutes = require('./routers/bookRoutes');
app.use('/books', bookRoutes);


app.get('/', (req, res) => {
    res.send('Library Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
