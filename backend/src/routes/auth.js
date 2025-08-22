import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db, initDb, newId } from "../db/db.js";

const router = Router();
await initDb();

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });
  await db.read();
  const exists = db.data.users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: "email already registered" });
  const user = { id: newId(), name: name || email.split("@")[0], email, passwordHash: bcrypt.hashSync(password, 10), createdAt: new Date().toISOString() };
  db.data.users.push(user);
  await db.write();
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "invalid credentials" });
  const ok = bcrypt.compareSync(password || "", user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.get("/session", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ ok: true, payload });
  } catch (e) {
    res.status(401).json({ error: "invalid token" });
  }
});

export default router;
