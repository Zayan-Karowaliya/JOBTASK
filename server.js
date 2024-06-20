import express from 'express';
import cors from 'cors';
import db from './models/index.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import routes
import router from './router/studentrouter.js';
import classrouter from './router/classrouter.js';
import teacherrouter from './router/teacherrouter.js';
import courserouter from './router/courserouter.js';
app.use('/api', router);
app.use('/api',classrouter)
app.use('/api',teacherrouter)
app.use('/api',courserouter)
// use other routes similarly

// Sync database and start server
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables synchronized!');

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
