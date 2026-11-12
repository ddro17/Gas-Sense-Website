import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

await fs.mkdir('test-results', { recursive: true });
const browser = await chromium.launch({channel:'msedge', headless:true, args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];
page.on('pageerror', e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
await page.locator('#hero-model canvas').waitFor();
await page.locator('#explorer-model canvas').waitFor();
await page.screenshot({path:'test-results/desktop-hero.png'});
await page.locator('#explore').scrollIntoViewIfNeeded();
await page.getByRole('button',{name:'Exploded view',exact:false}).click();
await page.waitForTimeout(800);
assert.equal(await page.locator('[data-view="exploded"]').getAttribute('aria-pressed'),'true');
await page.locator('[data-component="sensing"]').click();
assert.match(await page.locator('#part-title').textContent(),/Small inputs/);
await page.locator('.explorer-shell').screenshot({path:'test-results/desktop-exploded.png'});
await page.getByRole('button',{name:'Reset 3D camera view'}).click();
assert.equal(await page.locator('[data-view="assembled"]').getAttribute('aria-pressed'),'true');
assert.equal(await page.locator('[data-component="overview"]').getAttribute('aria-pressed'),'true');
for(const id of ['enclosure','valve','weight','power']){
  await page.locator(`[data-component="${id}"]`).click();
  assert.equal(await page.locator(`[data-component="${id}"]`).getAttribute('aria-pressed'),'true');
  assert.ok((await page.locator('#part-description').textContent()).length>80);
}
await page.locator('[data-scenario="critical"]').click();
assert.equal(await page.locator('#sim-valve').textContent(),'Shut-off issued');
await page.locator('[data-scenario="recovery"]').click();
assert.equal(await page.locator('#sim-valve').textContent(),'Held closed');
await page.locator('[data-scenario="pressure"]').click();
assert.match(await page.locator('#sim-description').textContent(),/not proof of a leak/);
await page.locator('[data-scenario="normal"]').click();
await page.locator('.simulation').screenshot({path:'test-results/desktop-simulation.png'});
for(const screen of ['critical','history','normal']){
  await page.locator(`[data-screen="${screen}"]`).click();
  await page.waitForFunction(()=>{const img=document.querySelector('#app-screen');return img.complete&&img.naturalWidth>0;});
  assert.equal(await page.locator('#app-screen').getAttribute('src'),`/assets/app-${screen}.png`);
}
await page.locator('.app-section').screenshot({path:'test-results/desktop-app.png'});
await page.locator('.build-steps details').nth(1).locator('summary').click();
assert.equal(await page.locator('.build-steps details').nth(1).getAttribute('open'),'');
const media=await page.evaluate(async()=>{const v=document.querySelector('video');v.preload='metadata';v.load();return new Promise(resolve=>{v.addEventListener('loadedmetadata',()=>resolve({duration:v.duration,width:v.videoWidth}),{once:true});v.addEventListener('error',()=>resolve({error:v.error?.message}),{once:true});setTimeout(()=>resolve({error:'metadata timeout'}),12000);});});
assert.ok(media.duration>170&&media.width>0,JSON.stringify(media));
assert.deepEqual(errors,[]);
await page.screenshot({path:'test-results/desktop-full.png',fullPage:true});
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Mobile horizontal overflow');
await page.screenshot({path:'test-results/mobile-hero.png'});
await page.getByRole('button',{name:'Open navigation'}).click();
assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'true');
await page.getByRole('navigation').getByRole('link',{name:'The system'}).click();
assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
await page.locator('[data-view="exploded"]').click();
await page.waitForTimeout(800);
await page.locator('.explorer-shell').screenshot({path:'test-results/mobile-exploded.png'});
await page.screenshot({path:'test-results/mobile-full.png',fullPage:true});
for(const width of [320,768,1024]){
  await page.setViewportSize({width,height:900});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`Overflow at ${width}`);
}
assert.deepEqual(errors,[]);
console.log(JSON.stringify({status:'passed',checks:['WebGL render','exploded and assembled modes','component descriptions','critical and held-closed scenarios','app screenshot switching','build accordion','AVP metadata','mobile navigation','320/390/768/1024px layouts','no JavaScript errors'],media},null,2));
await browser.close();
