import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getUploadDir } from "../services/storage.js";
import { db, initDb, newId } from "../db/db.js";
import { requireAuth } from "./requireAuth.js";

await initDb();
const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, getUploadDir()),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get("/", requireAuth, async (_req, res) => {
  await db.read();
  res.json(db.data.materials);
});

router.get("/:id", requireAuth, async (req, res) => {
  await db.read();
  const mat = db.data.materials.find(m => m.id === req.params.id);
  if (!mat) return res.status(404).json({ error: "not found" });
  res.json(mat);
});

router.post("/upload", requireAuth, upload.array("files", 10), async (req, res) => {
  const { subject = "general", type = "summary", language = "english" } = req.body || {};
  const files = req.files || [];
  await db.read();
  const saved = files.map(f => ({
    id: newId(),
    title: path.parse(f.originalname).name,
    subject,
    type,
    difficulty: "intermediate",
    thumbnail: null,
    createdAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
    wordCount: Math.floor(1500 + Math.random() * 2500),
    progress: 0,
    isBookmarked: false,
    language,
    filePath: f.path
  }));
  db.data.materials.push(...saved);
  await db.write();
  res.status(201).json(saved);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await db.read();
  const index = db.data.materials.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "not found" });
  const [removed] = db.data.materials.splice(index, 1);
  await db.write();
  if (removed?.filePath && fs.existsSync(removed.filePath)) fs.unlinkSync(removed.filePath);
  res.json({ ok: true });
});

export default router;
