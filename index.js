import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse  the JSON
app.use(express.json());

//A Simple POST endpoint
app.post('/test-json', (req, res) => {
  console.log('Received JSON:', req.body);
  res.status(200).json({
    message: 'JSON received successfully',
    data: req.body
  });
});

// ✅ Simple GET endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'GET request successful',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
