# DOM Scraper

This project fetches the DOM of multiple URLs using Puppeteer, saves the content as HTML files, and processes several URLs concurrently. You can configure how many URLs are processed at the same time by passing a concurrency parameter.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository** (or download the project files):

    ```bash
    git clone https://github.com/dudekm/dom-scraper.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd dom-scraper
    ```

3. **Install the required Node.js packages**:

    ```bash
    npm install
    ```

   This will install `puppeteer` and other dependencies defined in `package.json`.

## Configuration

The script accepts three parameters from the command line:

1. **URL list file**: A `.txt` file with one URL per line.
2. **Output directory**: The directory where the HTML files will be saved.
3. **Concurrency**: The number of URLs to process concurrently.

### Example of URL list file (`urls.txt`):

```
https://example.com
https://another-example.com
https://example.org
https://another-site.com
```

## Running the Project

Once you have installed the necessary dependencies and created your `urls.txt` file, you can run the project using Node.js.

To run the scraper, use the following command:

```bash
node index.js <urls.txt> <outputDir> <concurrency>
```

### Example

```bash
node index.js urls.txt ./dom_output 5
```
