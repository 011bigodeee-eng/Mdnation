// Run with an available Playwright installation; no runtime dependency is added.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const baseURL = process.env.VALIDATION_URL || "http://127.0.0.1:5173";
const output = process.env.VALIDATION_OUTPUT || "/tmp/md-nation-validation";
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const results = [];
  await page.goto(baseURL, { waitUntil: "networkidle" });
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.evaluate(() => scrollTo(0, 0));
    for (const section of await page.locator("main>section").all())
      await section.scrollIntoViewIfNeeded();
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll("h1,h2,h3,p,button,a,dt,dd")]
        .filter((e) => {
          const style = getComputedStyle(e);
          return (
            e.getClientRects().length &&
            style.display !== "none" &&
            e.clientWidth > 0 &&
            e.scrollWidth > e.clientWidth + 2
          );
        })
        .map((e) => ({
          element: e.tagName,
          class: e.className,
          text: e.textContent.trim().slice(0, 70),
          client: e.clientWidth,
          scroll: e.scrollWidth,
        })),
      brokenImages: [...document.images]
        .filter((e) => e.loading !== "lazy" || e.complete)
        .filter((e) => !e.complete || !e.naturalWidth)
        .map((e) => e.src),
    }));
    assert.equal(layout.overflow, false, `Horizontal overflow at ${width}`);
    assert.deepEqual(
      layout.clipped,
      [],
      `Clipped text at ${width}: ${JSON.stringify(layout.clipped)}`,
    );
    assert.deepEqual(layout.brokenImages, [], `Broken image at ${width}`);
    assert.equal(await page.locator(".md-method-card").count(), 3);
    assert.equal(await page.locator("#metodologia a").count(), 1);
    assert.equal(
      await page
        .locator(".method-route,.hero-trainer-card,.journey-tech-orbit")
        .count(),
      0,
    );
    const cards = await page.locator(".md-method-card").evaluateAll((els) =>
      els.map((e) => {
        const r = e.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
      }),
    );
    for (let i = 1; i < cards.length; i++)
      assert.ok(
        width < 1024
          ? cards[i].top >= cards[i - 1].bottom
          : cards[i].left >= cards[i - 1].right,
        `Overlapping method cards ${width}`,
      );
    const targets = await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((els) => els.map((e) => e.href));
    assert.ok(targets.length >= 3);
    targets.forEach((href) => {
      const u = new URL(href);
      assert.equal(u.pathname, "/5516996455766");
      assert.ok(u.searchParams.get("text").startsWith("Olá, Matheus!"));
    });
    const brokenAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((els) =>
        els
          .filter((e) => !document.getElementById(e.hash.slice(1)))
          .map((e) => e.hash),
      );
    assert.deepEqual(brokenAnchors, []);
    await page.evaluate(() => scrollTo(0, 0));
    if (width < 1024) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .getByRole("navigation", { name: "Navegação mobile" })
        .getByRole("link", { name: "Acompanhamento" })
        .click();
      assert.equal(await page.locator("#mobile-nav").count(), 0);
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#mobile-nav").count(), 0);
      assert.equal(
        await page
          .getByRole("button", { name: "Abrir menu" })
          .evaluate((e) => e === document.activeElement),
        true,
      );
    }
    const q = page.getByRole("button", { name: siteQuestion });
    await q.click();
    assert.equal(await q.getAttribute("aria-expanded"), "true");
    await page.locator("#faq-answer-0").waitFor({ state: "visible" });
    await q.click();
    assert.equal(await q.getAttribute("aria-expanded"), "false");
    const choices = page
      .getByRole("group", { name: "Escolha um momento da jornada" })
      .getByRole("button");
    for (let i = 0; i < 3; i++) {
      await choices.nth(i).click();
      assert.equal(await choices.nth(i).getAttribute("aria-pressed"), "true");
    }
    for (const button of await page
      .getByRole("button", { name: /Ampliar certificado:/ })
      .all()) {
      await button.click();
      await page.getByRole("dialog").waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "hidden" });
      assert.equal(
        await button.evaluate((e) => e === document.activeElement),
        true,
      );
    }
    const badTouches = await page
      .locator(
        ".menu-toggle,.button,.md-credential-preview,.md-credential-open,.faq-item button,.journey-options button",
      )
      .evaluateAll((els) =>
        els
          .filter(
            (e) =>
              e.getClientRects().length &&
              e.getBoundingClientRect().height < 44,
          )
          .map((e) => e.className),
      );
    assert.deepEqual(badTouches, []);
    results.push(
      `${width}px: layout, legibilidade, imagens, menu, FAQ, galeria, contatos e áreas de toque OK`,
    );
    console.log(results.at(-1));
    if ([390, 1440].includes(width)) {
      await page.evaluate(() => {
        document.activeElement?.blur();
        scrollTo(0, 0);
      });
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
      await page.screenshot({
        path: path.join(output, `pagina-${width}.png`),
        fullPage: true,
      });
      for (const section of ["metodologia", "certificacoes", "contato"])
        await page
          .locator(`#${section}`)
          .screenshot({
            path: path.join(output, `${section}-${width}.png`),
            style: ".header,.skip-link{visibility:hidden!important}",
          });
    }
  }
  assert.deepEqual(errors, []);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://mdnation.vercel.app/",
  );
  assert.equal(
    await page.locator('meta[property="og:image"]').getAttribute("content"),
    "https://mdnation.vercel.app/images/IMG_7740.JPG.jpeg",
  );
  await context.close();
  const introContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const introPage = await introContext.newPage();
  await introPage.goto(baseURL, { waitUntil: "load" });
  await introPage
    .getByRole("dialog", { name: "Abertura MD Nation" })
    .waitFor({ state: "visible" });
  assert.equal(
    await introPage.locator("#md-site-content").evaluate((e) => e.inert),
    true,
  );
  await introPage.waitForTimeout(650);
  await introPage.screenshot({ path: path.join(output, "intro-390.png") });
  await introPage
    .getByRole("dialog", { name: "Abertura MD Nation" })
    .waitFor({ state: "detached", timeout: 2200 });
  assert.equal(
    await introPage.locator("#md-site-content").evaluate((e) => e.inert),
    false,
  );
  assert.equal(
    await introPage.evaluate(() =>
      sessionStorage.getItem("mdnation:intro:seen"),
    ),
    "1",
  );
  await introPage.reload();
  assert.equal(await introPage.locator(".md-intro").count(), 0);
  await introPage.evaluate(() => sessionStorage.clear());
  await introPage.reload();
  await introPage.getByRole("button", { name: "Pular introdução" }).click();
  assert.equal(await introPage.locator(".md-intro").count(), 0);
  const fallback = await browser.newContext();
  await fallback.route(
    /\/(?:src\/main\.jsx|assets\/index-[^/]+\.js)(?:\?.*)?$/,
    (r) => r.abort(),
  );
  const fp = await fallback.newPage();
  await fp.goto(baseURL);
  await fp.waitForFunction(
    () => !document.documentElement.classList.contains("md-intro-running"),
    {},
    { timeout: 2500 },
  );
  results.push(
    "Abertura: primeira sessão, pular, recarga, movimento reduzido e watchdog OK. Console sem erros nas interações.",
  );
  console.log(results.at(-1));
  fs.writeFileSync(
    path.join(output, "results.json"),
    JSON.stringify({ baseURL, results }, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
const siteQuestion = "Como funciona o acompanhamento online?";
