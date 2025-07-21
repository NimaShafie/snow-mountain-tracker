const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.setHeader("Set-Cookie", [
    "token=; Path=/; HttpOnly; Max-Age=0; SameSite=None",
    "refreshToken=; Path=/; HttpOnly; Max-Age=0; SameSite=None; Domain=smtracker.shafie.org"
  ]);
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
