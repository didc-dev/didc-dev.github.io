import { spawn } from "node:child_process";
import { appendFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const browserPath = "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe";
const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const reportDir = path.resolve(process.env.QA_REPORT_DIR ?? ".qa-responsive");
const profileDir = path.join(reportDir, "browser-profile");
const port = 9333;
const externalBrowser = process.env.QA_EXTERNAL_BROWSER === "1";

const allRoutes = [
  "/", "/blog/", "/blog/active-directory-role-general/", "/blog/agdpl-explique-simplement/",
  "/blog/autocad-revit-approches/", "/blog/dhcp-configuration-reseau/",
  "/blog/diagnostic-reseau-premiere-methode/", "/blog/diagnostiquer-sans-conclure/",
  "/blog/dns-a-quoi-sert-il/", "/blog/documenter-une-modification/", "/blog/hyperviseur-role/",
  "/blog/ip-masque-passerelle-dns/", "/blog/link-test-et-otdr/", "/blog/proxmox-hyperv-virtualbox/",
  "/blog/raspberry-pi-petit-serveur/", "/blog/snapshot-sauvegarde-retour/", "/blog/tgbt-role-general/",
  "/blog/wifi-ou-zigbee/", "/contact/", "/formations/", "/metiers/", "/parcours/", "/realisations/",
  "/realisations/active-directory-cruzlab/", "/realisations/diagnostic-informatique/",
  "/realisations/domotique-maison/", "/realisations/fibre-optique-tests/",
  "/realisations/infrastructures-industrielles/", "/realisations/laboratoire-proxmox-ve/",
  "/realisations/planification-electrique/", "/realisations/raspberry-pi-services/",
];

const allViewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-landscape", width: 844, height: 390 },
];
const requestedRoutes = process.env.QA_ROUTE_FILTER?.split(",").map((value) => value.trim()).filter(Boolean);
const requestedViewports = process.env.QA_VIEWPORT_FILTER?.split(",").map((value) => value.trim()).filter(Boolean);
const routes = requestedRoutes?.length ? allRoutes.filter((route) => requestedRoutes.includes(route)) : allRoutes;
const viewports = requestedViewports?.length ? allViewports.filter((viewport) => requestedViewports.includes(viewport.name)) : allViewports;

const screenshotRoutes = new Set(["/", "/parcours/", "/formations/", "/metiers/", "/realisations/", "/blog/", "/contact/"]);

if (!externalBrowser) {
  await rm(reportDir, { recursive: true, force: true });
  await mkdir(profileDir, { recursive: true });
} else {
  await mkdir(reportDir, { recursive: true });
  await Promise.all(["audit.json", ...viewports.flatMap((viewport) => [...screenshotRoutes].map((route) => {
    const slug = route === "/" ? "accueil" : route.replaceAll("/", "-").replace(/^-|-$/g, "");
    return `${viewport.name}-${slug}.png`;
  }))].map((file) => rm(path.join(reportDir, file), { force: true })));
}

const browser = externalBrowser ? null : spawn(browserPath, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`,
  "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore", windowsHide: true });

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let version;
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json());
    break;
  } catch {
    await pause(100);
  }
}
if (!version) throw new Error("Le navigateur de contrôle n’a pas démarré.");

const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent("about:blank")}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const events = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  } else if (message.method && events.has(message.method)) {
    for (const listener of events.get(message.method)) listener(message.params);
  }
});

function send(method, params = {}) {
  commandId += 1;
  return new Promise((resolve, reject) => {
    pending.set(commandId, { resolve, reject });
    socket.send(JSON.stringify({ id: commandId, method, params }));
  });
}

function once(method, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const listeners = events.get(method) ?? new Set();
    const timer = setTimeout(() => {
      listeners.delete(handler);
      reject(new Error(`Délai dépassé pour ${method}`));
    }, timeoutMs);
    const handler = (params) => {
      clearTimeout(timer);
      listeners.delete(handler);
      resolve(params);
    };
    listeners.add(handler);
    events.set(method, listeners);
  });
}

await send("Page.enable");
await send("Runtime.enable");

const results = [];
const progressPath = path.resolve("qa-progress.log");
await rm(progressPath, { force: true });
for (const viewport of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: false,
    });
    for (const route of routes) {
      const loaded = once("Page.loadEventFired");
      const navigation = await send("Page.navigate", { url: `${baseUrl}${route}` });
      if (navigation.errorText) throw new Error(`${route}: ${navigation.errorText}`);
      await loaded;
      await send("Runtime.evaluate", {
        awaitPromise: true,
        expression: `(async () => {
          const step = Math.max(320, window.innerHeight - 120);
          const pageHeight = document.documentElement.scrollHeight;
          for (let y = 0; y < pageHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 35));
          }
          window.scrollTo(0, 0);
          await Promise.race([
            Promise.all([...document.images].map((image) => {
              if (image.complete) return Promise.resolve();
              return new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              });
            })),
            new Promise((resolve) => setTimeout(resolve, 5000)),
          ]);
          await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 2000))]);
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        })()`,
      });
      const { result } = await send("Runtime.evaluate", {
        awaitPromise: true,
        returnByValue: true,
        expression: `(async () => {
          const images = [...document.images];
          const imageUrls = [...new Set(images.map((image) => image.currentSrc || image.src).filter(Boolean))];
          const broken = (await Promise.all(imageUrls.map(async (url) => {
            try {
              const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
              return response.ok ? null : url;
            } catch {
              return url;
            }
          }))).filter(Boolean);
          const menuButton = document.querySelector('.menu-button');
          let menuInteraction = null;
          if (menuButton && getComputedStyle(menuButton).display !== 'none') {
            menuButton.click();
            await new Promise((resolve) => requestAnimationFrame(resolve));
            const opened = menuButton.getAttribute('aria-expanded') === 'true' && document.querySelector('#main-nav')?.classList.contains('open');
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            menuInteraction = {
              opened,
              closed: menuButton.getAttribute('aria-expanded') === 'false' && !document.querySelector('#main-nav')?.classList.contains('open'),
              focusRestored: document.activeElement === menuButton,
            };
          }
          return {
            title: document.title,
            h1: document.querySelector('h1')?.textContent?.trim() || '',
            imageCount: images.length,
            broken,
            decodeFailures: images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
            menuInteraction,
            missingAlt: images.filter((image) => !image.hasAttribute('alt')).map((image) => image.currentSrc || image.src),
            overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
            scrollWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
            placeholders: [...document.querySelectorAll('img')].filter((image) => /placeholder/i.test(image.src)).map((image) => image.src),
          };
        })()`,
      });
      const audit = result.value;
      results.push({ viewport: viewport.name, route, ...audit });
      await appendFile(progressPath, `${viewport.name} ${route}\n`);

      if (screenshotRoutes.has(route)) {
        const metrics = await send("Page.getLayoutMetrics");
        const height = Math.min(Math.ceil(metrics.cssContentSize.height), 8000);
        const shot = await send("Page.captureScreenshot", {
          format: "png", captureBeyondViewport: true,
          clip: { x: 0, y: 0, width: viewport.width, height, scale: 1 },
        });
        const slug = route === "/" ? "accueil" : route.replaceAll("/", "-").replace(/^-|-$/g, "");
        await writeFile(path.join(reportDir, `${viewport.name}-${slug}.png`), Buffer.from(shot.data, "base64"));
      }
  }
}

const failures = results.filter((entry) => entry.broken.length || entry.decodeFailures.length || entry.missingAlt.length || entry.overflow || entry.placeholders.length || !entry.h1 || (entry.menuInteraction && (!entry.menuInteraction.opened || !entry.menuInteraction.closed || !entry.menuInteraction.focusRestored)));
await appendFile(progressPath, `REPORT ${results.length} ${failures.length}\n`);
await writeFile(path.join(reportDir, "audit.json"), JSON.stringify({ results, failures }, null, 2));
console.log(JSON.stringify({ pages: routes.length, checks: results.length, screenshots: screenshotRoutes.size * viewports.length, failures }, null, 2));
socket.close();
browser?.kill();
if (failures.length) process.exitCode = 1;
