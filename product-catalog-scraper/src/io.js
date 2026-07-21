const fs = require("fs/promises");
const path = require("path");

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await ensureDirectory(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function escapeCsv(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

async function writeCsv(filePath, records) {
  await ensureDirectory(path.dirname(filePath));

  const headers = [
    "productId",
    "title",
    "price",
    "imageUrl",
    "description",
    "keywords",
    "sourceUrl"
  ];

  const rows = records.map((record) =>
    headers.map((header) => escapeCsv(record[header])).join(",")
  );

  await fs.writeFile(filePath, [headers.join(","), ...rows].join("\n"));
}

module.exports = { ensureDirectory, readJson, writeJson, writeCsv };
