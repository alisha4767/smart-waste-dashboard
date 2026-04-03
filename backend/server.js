import express from 'express';
import cors from 'cors';
import binsRoutes from './routes/bins.js';
import reportsRoutes from './routes/reports.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/bins', binsRoutes);
app.use('/reports', reportsRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Smart Waste Management API is actively running entirely utilizing in-memory array data');
});

app.listen(PORT, () => {
  console.log(`Server executing natively tracking zero dependencies on port ${PORT}`);
});
