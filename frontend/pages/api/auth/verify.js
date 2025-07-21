// frontend/pages/auth/verify.js

export default function handler(req, res) {
  return res.status(410).json({ message: "Deprecated route. Use /auth/verify-token instead." });
}
