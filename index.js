// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Helper to parse numbers safely
function parseNumbers(req, res) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({
      error: 'Please provide valid numbers for a and b as query parameters',
      example: '/add?a=10&b=5'
    });
    return null;
  }

  return { a, b };
}

// Add: /add?a=10&b=5
app.get('/add', (req, res) => {
  const nums = parseNumbers(req, res);
  if (!nums) return;

  const result = nums.a + nums.b;
  res.json({ operation: 'add', a: nums.a, b: nums.b, result });
});

// Subtract: /subtract?a=10&b=5
app.get('/subtract', (req, res) => {
  const nums = parseNumbers(req, res);
  if (!nums) return;

  const result = nums.a - nums.b;
  res.json({ operation: 'subtract', a: nums.a, b: nums.b, result });
});

// Multiply: /multiply?a=10&b=5
app.get('/multiply', (req, res) => {
  const nums = parseNumbers(req, res);
  if (!nums) return;

  const result = nums.a * nums.b;
  res.json({ operation: 'multiply', a: nums.a, b: nums.b, result });
});

// Divide: /divide?a=10&b=5
app.get('/divide', (req, res) => {
  const nums = parseNumbers(req, res);
  if (!nums) return;

  if (nums.b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }

  const result = nums.a / nums.b;
  res.json({ operation: 'divide', a: nums.a, b: nums.b, result });
});

// Server start - feature-1 version
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
