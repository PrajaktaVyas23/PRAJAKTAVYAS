import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { randomUUID } from "crypto";

const dbFile = path.join(process.cwd(), "src", "db", "db.json");
const adapter = new JSONFile(dbFile);
export const db = new Low(adapter, { users: [], materials: [], chats: [], analytics: {} });

export async function initDb() {
  await db.read();
  db.data ||= { users: [], materials: [], chats: [], analytics: {} };
  if (!db.data.analytics.overview) {
    db.data.analytics.overview = {
      totalStudyTimeHours: 127,
      materialsCompleted: 43,
      quizAccuracyPercent: 88,
      currentStreakDays: 7
    };
  }
  await db.write();
}

export function newId() {
  return randomUUID();
}
