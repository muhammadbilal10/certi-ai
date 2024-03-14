const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
//server health check
app.get('/api', (req, res) => {
  res.json({ message: 'Certi Server is runnings' });
});
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });
// app.use((req, res) => {
//     res.status(404).json({ message: 'Route not found' });
//     });

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});