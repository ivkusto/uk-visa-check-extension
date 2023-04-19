# UK Visa Sponsorship Checker Chrome Extension

Visa Sponsorship Checker is a Chrome Web Extension that helps users identify if a company provides visa sponsorship for job opportunities. The extension is designed to work with the Indeed website, with plans to support other career sites in the future.

This project is built using Solid.js, Vite, and IndexedDb.

## Features

- Load a CSV file containing a list of companies that provide visa sponsorship (only required once)
- Automatically marks companies from the sponsorship list on the Indeed website
- Simple and easy-to-use interface

## Data Source

The CSV data containing the list of companies that provide visa sponsorship can be obtained from the following link:

[UK Tier Sponsors - All](https://uktiersponsors.blob.core.windows.net/excel/UkTiersponsors_All.csv)

## Installation

1. Download the latest build from the "build" branch or clone the repository to your local machine:

```bash
git clone https://github.com/ivkusto/uk-visa-check-extension.git --branch build
```

2. Load the unpacked extension to Chrome:

- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode" in the top right corner
- Click "Load unpacked" and select the `dist` folder in the `visa-sponsorship-checker` directory

## Usage

1. Click on the Visa Sponsorship Checker extension icon in the Chrome toolbar.
2. Load the CSV file containing the list of companies that provide visa sponsorship (only required once).
3. Navigate to the Indeed website and search for job opportunities. The extension will automatically mark companies from the sponsorship list.



