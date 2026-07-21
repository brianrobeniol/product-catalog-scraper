const { URL } = require("url");

function normalizeProductUrl(rawUrl, baseUrl = "https://www.example.com") {
  if (!rawUrl) {
    return null;
  }

  const parsedUrl = new URL(rawUrl, baseUrl);
  const productMatch = parsedUrl.pathname.match(/\/(?:dp|product|gp\/product)\/([^/]+)/);

  if (!productMatch) {
    return null;
  }

  parsedUrl.pathname = `/dp/${productMatch[1]}/`;
  parsedUrl.search = "";
  parsedUrl.hash = "";

  return parsedUrl.toString();
}

function getProductId(productUrl) {
  const match = productUrl.match(/\/(?:dp|product|gp\/product)\/([^/]+)/);
  return match ? match[1] : "";
}

module.exports = { normalizeProductUrl, getProductId };
