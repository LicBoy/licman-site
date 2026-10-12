# licman.dev

Personal site of **Ruslan Akhmetvaleev**, QA automation engineer (SDET) in fintech who also builds apps for small businesses.

Live: **https://licman.dev**

Every project on the page has its own interactive demo:

| Chapter | Demo |
|---|---|
| Hero | `ruslan.feature`: a Gherkin scenario that runs and passes on load |
| Rahat Go | A working phone: order as a customer, process it as staff, see it in the owner's analytics and price playground |
| Payments test automation | Run an ISO 20022 instant-payment scenario, inject a bug and watch the test catch it, with an Allure-style report |
| Chat-labeling automation | Replay of the RuBERT + Selenium bot labeling chats, with probabilities and honest misses |
| Image super-resolution | Bicubic vs ESRGAN slider with a magnifier, on the thesis outputs |
| Swiper | A playable browser remake of the Android game |

## Stack

[Astro](https://astro.build) (static output), vanilla TypeScript, Canvas and SVG. No UI framework and no tracking.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Requires Node 22.12+. Deployed as a Cloudflare Worker with static assets: `npm run build && npx wrangler deploy`.

## Content notes

The Rahat Go menu, prices and photos are real; recipe costs and today's orders in the demo are illustrative. The payment scenario uses public ISO 20022 message types only. Chats in the labeling demo are synthetic; the accuracy figures come from the project's saved results.
