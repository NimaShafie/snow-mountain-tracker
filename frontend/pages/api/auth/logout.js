// frontend/pages/api/auth/logout.js

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  res.setHeader(
    'Set-Cookie',
    'token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax'
  );
  res.status(200).json({ message: 'Logged out' });
}
