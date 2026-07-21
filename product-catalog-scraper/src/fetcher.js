const axios = require("axios");

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (compatible; ProductCatalogScraper/1.0; educational-project)";

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchHtml(url, options = {}) {
  const response = await axios.get(url, {
    timeout: options.timeout || 15000,
    headers: {
      "User-Agent": options.userAgent || DEFAULT_USER_AGENT
    }
  });

  return response.data;
}

async function fetchSequentially(urls, handler, delayMs = 1000) {
  const results = [];

  for (const url of urls) {
    try {
      results.push(await handler(url));
    } catch (error) {
      console.error(`Failed to process ${url}: ${error.message}`);
    }

    if (delayMs > 0) {
      await wait(delayMs);
    }
  }

  return results.filter(Boolean);
}

module.exports = { fetchHtml, fetchSequentially };
