import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit' });
let browser;
try {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch('http://127.0.0.1:4173')).ok) break; } catch {}
    if (i === 49) throw new Error('Preview server unavailable');
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  await mkdir('ui-screenshots', { recursive: true });
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // External artwork and fonts may be unavailable; the interface must still work.
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:4173') ? route.continue() : route.abort());
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
  await page.locator('.catalogue-table tbody tr').first().waitFor();
  const total = Number(await page.locator('#metricTotal').textContent());
  assert.ok(total > 12);
  assert.equal(await page.locator('.catalogue-table tbody tr').count(), 12);
  await page.screenshot({ path: 'ui-screenshots/desktop-light.png' });
  await page.locator('#nextPage').click();
  assert.match(await page.locator('#pageNumber').textContent(), /^2 \/ /);
  await page.locator('#prevPage').click();
  await page.locator('.catalogue-table [data-compare]').nth(0).click();
  await page.locator('#nextPage').click();
  await page.locator('.catalogue-table [data-compare]').nth(0).click();
  await page.locator('[data-open-comparison]').click();
  assert.ok(await page.locator('#compareDialog').isVisible());
  await page.locator('#compareDialog [data-close-dialog]').click();
  await page.locator('[data-remove-compare]').first().click();
  assert.equal(await page.locator('[data-remove-compare]').count(), 1);
  await page.locator('[data-remove-compare]').first().click();
  await page.locator('.catalogue-table [data-detail]').first().click();
  assert.ok(await page.locator('#detailDialog').isVisible());
  await page.locator('#detailDialog [data-fav]').click();
  assert.equal(await page.locator('#detailDialog [data-fav]').getAttribute('aria-pressed'), 'true');
  await page.locator('#detailDialog [data-close-dialog]').click();
  await page.locator('#railFavorites').click();
  assert.equal(await page.locator('#metricResults').textContent(), '1');
  await page.locator('#railFavorites').click();
  await page.locator('#searchInput').fill('zzzz-not-a-distribution-zzzz');
  await page.locator('.empty-catalogue').waitFor();
  await page.locator('[data-reset-filters]').click();
  await page.locator('.catalogue-table tbody tr').first().waitFor();
  await page.locator('#viewCards').click();
  assert.equal(await page.locator('#gridContainer .card').count(), 12);
  await page.locator('#themeToggle').click();
  assert.equal(await page.locator('body').evaluate(el => el.classList.contains('light')), false);
  await page.screenshot({ path: 'ui-screenshots/desktop-dark-cards.png' });
  await page.locator('#openAdvisor').click();
  await page.locator('#advisorForm button[type=submit]').click();
  assert.ok(await page.locator('#advisorResults .recommend-card').count() > 0);
  await page.locator('#advisorDialog [data-close-dialog]').click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'ui-screenshots/mobile-dark-cards.png' });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile page overflow');
  await page.locator('#viewList').click();
  await page.screenshot({ path: 'ui-screenshots/mobile-dark-list.png' });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile list overflow');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('.catalogue-table tbody tr').first().waitFor();
  assert.equal(await page.locator('body').evaluate(el => el.classList.contains('light')), false);
  assert.deepEqual(errors, []);
  console.log('UI smoke: catalogue, pagination, favorites, comparison, advisor, search, themes and mobile passed');
} finally {
  await browser?.close();
  server.kill();
}
