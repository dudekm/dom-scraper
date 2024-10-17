const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function getDomFromUrl(url, outputDir) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const domContent = await page.content();
        console.log(`DOM for ${url} fetched successfully.`);

        const fileName = generateFileNameFromUrl(url);
        const filePath = path.join(outputDir, fileName);

        saveDomToFile(filePath, domContent);
    } catch (error) {
        console.error(`Error fetching DOM from ${url}:`, error);
    } finally {
        await browser.close();
    }
}

function generateFileNameFromUrl(url) {
    return url.replace(/https?:\/\//, '').replace(/\W+/g, '_') + '.html';
}

function saveDomToFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`DOM saved to ${filePath}`);
}

function loadUrlsFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File ${filePath} does not exist.`);
        process.exit(1);
    }
    const urls = fs.readFileSync(filePath, 'utf-8').split('\n').filter(url => url.trim() !== '');
    return urls;
}

function createOutputDirectoryIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

async function processUrlsInBatches(urls, outputDir, concurrency) {
    const promises = [];

    for (let i = 0; i < urls.length; i += concurrency) {
        const batch = urls.slice(i, i + concurrency).map(url => getDomFromUrl(url, outputDir));
        promises.push(Promise.all(batch));
    }

    await Promise.all(promises);
    console.log('Finished fetching all URLs.');
}

(async () => {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error('Usage: node index.js <urls.txt> <outputDir> <concurrency>');
        process.exit(1);
    }

    const [urlsFilePath, outputDir, concurrency] = args;

    const urls = loadUrlsFromFile(urlsFilePath);

    createOutputDirectoryIfNotExists(outputDir);

    await processUrlsInBatches(urls, outputDir, parseInt(concurrency, 10));
})();