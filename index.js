const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 10000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfGtEFELbOFuS9tvVXZFQpSb4j1HuKHZ85LhM-E-X5-KwHEz2N3BVHRgCYZaOwVzOFcA/exec';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', async (req, res) => {
  const response = await fetch(GOOGLE_SCRIPT_URL);
  const data = await response.text();
  res.type('json').send(data);
});

app.post('/', async (req, res) => {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const data = await response.text();
  res.type('json').send(data);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});