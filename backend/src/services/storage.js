import fs from "fs";
import path from "path";

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

export function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

export function getUploadDir() {
  return uploadDir;
}
