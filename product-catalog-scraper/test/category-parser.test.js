const test = require("node:test");
const assert = require("node:assert/strict");
const { extractProductUrls } = require("../src/category-parser");

const html = `
  <figure data-test="product">
    <a href="/dp/ABC123/ref=tracking">Product A</a>
  </figure>
  <figure data-test="product">
    <a href="/dp/XYZ789/?tag=test">Product B</a>
  </figure>
`;

test("extractProductUrls returns normalized, unique product URLs", () => {
  assert.deepEqual(
    extractProductUrls(html, { baseUrl: "https://shop.example.com" }),
    [
      "https://shop.example.com/dp/ABC123/",
      "https://shop.example.com/dp/XYZ789/"
    ]
  );
});
