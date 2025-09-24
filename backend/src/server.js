const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
