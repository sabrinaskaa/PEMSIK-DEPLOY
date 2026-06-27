const fs = require("fs");
const path = require("path");

const dbDir = path.join(__dirname, "db");
const outputFile = path.join(__dirname, "db.json");

const files = fs.readdirSync(dbDir).filter((f) => f.endsWith(".json"));

const merged = {};

files.forEach((file) => {
  const key = path.basename(file, ".json");
  const content = fs.readFileSync(path.join(dbDir, file), "utf-8");
  merged[key] = JSON.parse(content);
});

fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2), "utf-8");

console.log("db.json berhasil dibuat dari:", files.join(", "));
