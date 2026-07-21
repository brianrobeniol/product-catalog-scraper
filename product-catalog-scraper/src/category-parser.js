const cheerio = require("cheerio");
const { normalizeProductUrl } = require("./url-utils");

function extractProductUrls(html, options = {}) {
  const baseUrl = options.baseUrl || "https://www.example.com";
  const selector = options.selector || 'figure[data-test="product"] a';
  const $ = cheerio.load(html);
  const urls = new Set();

  $(selector).each((_, element) => {
    const normalizedUrl = normalizeProductUrl($(element).attr("href"), baseUrl);
    if (normalizedUrl) {
      urls.add(normalizedUrl);
    }
  });

  return [...urls];
}

module.exports = { extractProductUrls };
