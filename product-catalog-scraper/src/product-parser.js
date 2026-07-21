const cheerio = require("cheerio");
const { getProductId } = require("./url-utils");

function cleanText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function parseProductPage(html, productUrl) {
  const $ = cheerio.load(html);
  const productId = getProductId(productUrl);

  const description = $("#feature-bullets li .a-list-item")
    .map((_, element) => cleanText($(element).text()))
    .get()
    .filter(Boolean);

  const keywords = $("#nav-subnav a.nav-a:not(.nav-b)")
    .map((_, element) => cleanText($(element).text()))
    .get()
    .filter(Boolean);

  return {
    productId,
    title: cleanText($("#productTitle").text()),
    price: cleanText($("span.a-offscreen").first().text()),
    imageUrl: $("#landingImage").attr("src") || "",
    description,
    keywords,
    sourceUrl: productUrl
  };
}

module.exports = { parseProductPage };
