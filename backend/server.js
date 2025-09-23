import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';
app.use(cors({ origin: ALLOW_ORIGIN }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/reservations', (req, res) => {
  const payload = req.body || {};
  console.log('🔔 New reservation:', JSON.stringify(payload, null, 2));

  const { name, email, partySize, date, time } = payload;
  if (!name || !email || !date || !time) {
    return res.status(422).json({ message: 'Missing required fields.' });
  }

  const id = Math.random().toString(36).slice(2, 10);
  res.status(201).json({ id, received: payload, message: 'Reservation received.' });
});

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`   CORS allow origin: ${ALLOW_ORIGIN}`);
});
