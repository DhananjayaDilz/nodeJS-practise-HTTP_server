import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple POST endpoint
app.post('/test-json', (req, res) => {
  console.log('Received JSON:', req.body);
  res.status(200).json({
    message: 'JSON received successfully',
    data: req.body
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
