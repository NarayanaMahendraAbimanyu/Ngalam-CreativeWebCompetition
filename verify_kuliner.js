import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the /kuliner route of the development server
  await page.goto('http://localhost:5173/kuliner');

  // Wait for the content to load
  await page.waitForSelector('main', { state: 'visible' });

  // Take a screenshot
  await page.screenshot({ path: 'kuliner_page.png' });
  console.log('Screenshot saved to kuliner_page.png');

  await browser.close();
})();
