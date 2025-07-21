// frontend/pages/api/auth/me.js

export default function handler(req, res) {
  const cookie = req.headers.cookie || '';
  const token = cookie
    .split(';')
    .find(c => c.trim().startsWith('token='))
    ?.split('=')[1];

  if (token === 'example-token') {
    return res.status(200).json({ user: { name: 'Test User', email: 'test@example.com' } });
  }

  return res.status(401).json({ message: 'Not authenticated' });
}
