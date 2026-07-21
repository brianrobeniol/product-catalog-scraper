# Product Catalog Scraper

A modular Node.js web scraping pipeline that transforms saved category-page HTML into structured product datasets by extracting, normalizing, and enriching product information.

---

## Overview

This project demonstrates a complete two-stage data extraction (ETL) workflow built with Node.js, Axios, and Cheerio.

Rather than scraping a live category page end-to-end, the pipeline is intentionally divided into separate stages:

1. Parse saved category-page HTML and extract product URLs.
2. Normalize and deduplicate extracted URLs.
3. Fetch each product page asynchronously.
4. Extract structured product metadata.
5. Export the resulting dataset as JSON and CSV.

This modular architecture makes each stage independently testable and reusable while demonstrating common data engineering and web scraping patterns.

---

## Why I Built It

I originally created this tool to support a product discovery workflow that required clean, structured catalog data from semi-structured HTML.

The project provided practical experience with:

- HTML parsing
- DOM traversal
- URL normalization
- Asynchronous HTTP requests
- Data transformation
- File processing
- JSON and CSV generation
- Modular software design

---

## Architecture

```text
          Saved Category HTML
                   │
                   ▼
        Category URL Extractor
                   │
                   ▼
        URL Normalization & Cleanup
                   │
                   ▼
         Product Page Fetcher
                   │
                   ▼
        Product Metadata Parser
                   │
                   ▼
      Structured Product Records
             │            │
             ▼            ▼
          JSON Output   CSV Output
```

---

## Features

- Extracts product URLs from saved HTML
- Removes tracking parameters from URLs
- Deduplicates product links
- Fetches product pages asynchronously
- Extracts structured product metadata
- Exports JSON and CSV datasets
- Modular architecture with separated parsing and networking logic
- Configurable request throttling
- Batch processing of multiple input files

---

## Tech Stack

- JavaScript (ES6)
- Node.js
- Axios
- Cheerio
- Native File System API
- Path API

---

## Project Structure

```text
product-catalog-scraper/
├── src/
│   ├── category-parser.js
│   ├── product-parser.js
│   ├── url-utils.js
│   ├── fetcher.js
│   ├── io.js
│   └── cli.js
├── examples/
├── test/
├── package.json
└── README.md
```

---

## Example Workflow

### Stage 1 — URL Extraction

Input:

```
Saved category HTML
```

Output:

```json
{
  "urls": ["https://example.com/product/123", "https://example.com/product/456"]
}
```

---

### Stage 2 — Product Enrichment

Each normalized URL is visited and transformed into a structured record.

Example:

```json
{
  "productId": "B07XXXXXXX",
  "title": "Portable Charger",
  "price": "$21.99",
  "imageUrl": "...",
  "description": "...",
  "keywords": ["Electronics", "Chargers"]
}
```

The resulting records can be exported as JSON or CSV for downstream analysis or database ingestion.

---

## Setup

Install dependencies:

```bash
npm install
```

---

## Usage

Extract normalized product URLs:

```bash
npm run extract:urls -- examples/input/sample-category.html output/product-urls.json
```

Extract product details:

```bash
npm run extract:products -- output/product-urls.json output
```

Adjust the delay between requests:

```bash
REQUEST_DELAY_MS=2500 npm run extract:products -- output/product-urls.json output
```

---

## Engineering Highlights

Compared with the initial prototype, this version introduces several software engineering improvements:

- Modular architecture separating parsing, networking, URL handling, and file output
- Promise-based filesystem operations
- URL deduplication
- Standards-compliant CSV generation
- Removal of project-specific constants and affiliate parameters
- Configurable request throttling
- Parser unit tests
- Git-friendly project organization

---

## Technical Challenges

Some of the interesting engineering problems solved during development included:

- Extracting structured data from inconsistent HTML layouts
- Canonicalizing product URLs by removing tracking parameters
- Safely escaping CSV fields containing commas and quotation marks
- Separating network requests from HTML parsing to improve maintainability
- Processing multiple files while preserving a clean output structure

---

## Skills Demonstrated

This project demonstrates practical experience with:

- Web scraping
- HTML parsing
- DOM traversal
- Asynchronous JavaScript
- ETL pipelines
- Data normalization
- File processing
- CSV generation
- JSON serialization
- Modular software architecture
- Node.js scripting

---

## Testing

Run the automated tests:

```bash
npm test
```

---

## Future Enhancements

Potential improvements include:

- Parallel request processing with configurable concurrency
- Retry logic with exponential backoff
- Headless browser support using Playwright
- Configurable parsers for multiple storefronts
- Schema validation
- SQLite or PostgreSQL export adapters
- Docker support
- TypeScript migration

---

## Responsible Use

This repository is intended for educational purposes to demonstrate HTML parsing, data extraction, and ETL pipeline design.

Before collecting data from any website, always review the site's Terms of Service, robots.txt guidance, available APIs, and applicable laws. Respect rate limits and use official APIs whenever possible.

---

## License

MIT License
