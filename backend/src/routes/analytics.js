import { Router } from "express";
import { db, initDb } from "../db/db.js";
import { requireAuth } from "./requireAuth.js";

await initDb();
const router = Router();

router.get("/overview", requireAuth, async (_req, res) => {
  await db.read();
  res.json(db.data.analytics.overview);
});

export default router;
