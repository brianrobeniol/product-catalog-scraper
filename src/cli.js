const fs = require("fs/promises");
const path = require("path");
const { extractProductUrls } = require("./category-parser");
const { parseProductPage } = require("./product-parser");
const { fetchHtml, fetchSequentially } = require("./fetcher");
const { readJson, writeJson, writeCsv } = require("./io");

async function extractUrls() {
  const inputPath = process.argv[3] || "examples/input/sample-category.html";
  const outputPath = process.argv[4] || "output/product-urls.json";
  const baseUrl = process.env.BASE_URL || "https://www.amazon.com";
  const html = await fs.readFile(inputPath, "utf8");
  const urls = extractProductUrls(html, { baseUrl });

  await writeJson(outputPath, { urls });
  console.log(`Extracted ${urls.length} URLs to ${outputPath}`);
}

async function extractProducts() {
  const inputPath = process.argv[3] || "output/product-urls.json";
  const outputDirectory = process.argv[4] || "output";
  const delayMs = Number(process.env.REQUEST_DELAY_MS || 1500);
  const { urls } = await readJson(inputPath);

  const products = await fetchSequentially(
    urls,
    async (url) => parseProductPage(await fetchHtml(url), url),
    delayMs
  );

  await writeJson(path.join(outputDirectory, "products.json"), products);
  await writeCsv(path.join(outputDirectory, "products.csv"), products);
  console.log(`Saved ${products.length} product records to ${outputDirectory}`);
}

async function main() {
  const command = process.argv[2] || "urls";

  if (command === "urls") {
    await extractUrls();
  } else if (command === "products") {
    await extractProducts();
  } else {
    throw new Error("Use either 'urls' or 'products'.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
