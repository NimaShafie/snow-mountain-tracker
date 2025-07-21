import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  // Example static check — replace with real DB check
  if (email === 'test@example.com' && password === 'password') {
    res.setHeader('Set-Cookie', `token=example-token; Path=/; HttpOnly; Secure; SameSite=Lax`);
    return res.status(200).json({ message: 'Logged in' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
