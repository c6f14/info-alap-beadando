import express from 'express';
import cors from 'cors';

const app = express();

// Allow JSON bodies
app.use(express.json());

// CORS: set your Pages/production origin here
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';
// e.g. "https://<user>.github.io" or "https://<user>.github.io/<repo>"
app.use(cors({ origin: ALLOW_ORIGIN }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Reservation endpoint (matches your frontend default)
app.post('/reservations', (req, res) => {
  const payload = req.body || {};
  // Basic logging
  console.log('🔔 New reservation:', JSON.stringify(payload, null, 2));

  // (Optional) super-light validation
  const { name, email, partySize, date, time } = payload;
  if (!name || !email || !date || !time) {
    return res.status(422).json({ message: 'Missing required fields.' });
  }

  // Simulate created resource
  const id = Math.random().toString(36).slice(2, 10);
  res.status(201).json({ id, received: payload, message: 'Reservation received.' });
});

// Fallback 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`   CORS allow origin: ${ALLOW_ORIGIN}`);
});
