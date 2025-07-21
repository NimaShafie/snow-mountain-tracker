// frontend/pages/internal-api/auth/verify.js

export default function handler(req, res) {
  return res.status(410).json({ message: "Deprecated route. Use /internal-api/auth/verify-token instead." });
}
