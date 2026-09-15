# 听时 · Ting Shi

An immersive sound archive shaped by time, Wuxing, and traditional Chinese musical thought.

听时把当下的时间、天干地支、五行状态与声音体验连接起来：首页呈现此刻，听页整理声音，源页保留简短的古籍依据与关系说明。

## Highlights

- Time-aware homepage with current heavenly stem and earthly branch information
- Wuxing-inspired visual states and corresponding music recommendations
- Desktop moment text transitions with time, element, and classical references
- Responsive web experience plus a separate mini-program implementation
- Audio playback with local MP3 assets and autoplay recovery after browser policy blocks

## Tech stack

- React 19
- Vite 7
- HTML / CSS / JavaScript

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deploy

This project is configured for static hosting. For Cloudflare Pages, connect the GitHub repository with:

- Build command: `npm run build`
- Build output directory: `dist`

Every push to the production branch can then trigger a new deployment, while pull requests can use preview deployments.
