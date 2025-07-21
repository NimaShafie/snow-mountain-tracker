// frontend/pages/api/auth/login.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  // Example static check (for testing)
  if (email === 'test@example.com' && password === 'password') {
    // Set mock session token
    res.setHeader('Set-Cookie', 'token=example-token; Path=/; HttpOnly; Secure; SameSite=Lax, Domain=${process.env.COOKIE_DOMAIN}');
    return res.status(200).json({ message: 'Logged in', user: { name: 'Test User', email } });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
