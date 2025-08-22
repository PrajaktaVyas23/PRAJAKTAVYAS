import { Router } from "express";
import { db, initDb, newId } from "../db/db.js";
import { requireAuth } from "./requireAuth.js";

await initDb();
const router = Router();

router.get("/history", requireAuth, async (_req, res) => {
  await db.read();
  res.json(db.data.chats);
});

router.post("/send", requireAuth, async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: "message required" });
  const userMsg = { id: newId(), isUser: true, content: message, timestamp: new Date().toISOString() };
  const botMsg = { id: newId(), isUser: false, content: mockAiResponse(message), timestamp: new Date().toISOString() };
  await db.read();
  db.data.chats.push(userMsg, botMsg);
  await db.write();
  res.json({ messages: [userMsg, botMsg] });
});

function mockAiResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("practice")) return "Here are 3 practice questions to try...";
  if (t.includes("explain")) return "Let me explain step-by-step...";
  if (t.includes("summar")) return "Summary: ...";
  return "I can help with explanations, summaries, and quizzes. What would you like?";
}

export default router;
