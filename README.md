# NexusAI Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19-111827?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-111827?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-7-111827?style=for-the-badge&logo=vite&logoColor=646CFF)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-111827?style=for-the-badge&logo=greensock&logoColor=88CE02)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-111827?style=for-the-badge&logo=framer&logoColor=0055FF)

A cinematic, conversion-first SaaS frontend for an AI chat product.
Built to feel premium, interactive, and launch-ready.

</div>

## Why This Project Stands Out

NexusAI is not a generic landing page.
It combines narrative scroll choreography, real-time chat simulation, and polished UI motion to showcase an AI product with clarity and confidence.

- Story-driven page flow with pin + snap section transitions
- Rich motion interactions with practical performance choices
- Simulated AI chat streaming for product demonstration
- Modular architecture for rapid customization and expansion
- Design system foundation with reusable primitives

## Preview

Add screenshots or GIFs in this section once available.

### Hero / Above the Fold

![Hero Screenshot](./docs/screenshots/hero.png)

### Interactive Chat Demo

![Chat Screenshot](./docs/screenshots/chat.png)

### Pricing + CTA

![Pricing Screenshot](./docs/screenshots/pricing.png)

If these files do not exist yet, create the directory and replace with your assets:

```bash
mkdir -p docs/screenshots
```

## Feature Tour

1. Pinned Scroll Storytelling
- GSAP ScrollTrigger drives section timing and readable snap points.
- Navigation respects pinned and non-pinned section behavior.

2. AI Chat Experience Mock
- Message bubbles, streaming indicators, and send/stop interactions.
- Conversation and message state handled through reusable hooks.

3. Conversion-Oriented Sections
- Capabilities, Security, Integrations, Pricing, and CTA sections are structured to support demos and marketing use cases.

4. Reusable UI Foundation
- Radix-based primitives in a dedicated UI layer.
- Easy to extend and restyle for additional product surfaces.

## Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- Framer Motion
- GSAP + ScrollTrigger
- Radix UI
- Lucide React

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Type-check + production build
npm run preview  # Preview built output locally
npm run lint     # Run ESLint
```

## Architecture Snapshot

```text
src/
  components/
    chat/          # Chat demos and interaction UIs
    sections/      # Product storytelling sections
    ui/            # Reusable UI primitives
    Navigation.tsx
  hooks/
    useChat.ts
    useStreamingText.ts
  types/
    index.ts
  App.tsx
```

## Customize for Your Brand

- Content: update section copy in `src/components/sections/`
- Visual system: tune tokens in `tailwind.config.js`
- Scroll behavior: adjust orchestration in `src/App.tsx`
- Chat demos: extend flows in `src/components/chat/` and `src/hooks/useChat.ts`

## Deployment

This project is static-host friendly.

```bash
npm run build
```

Deploy the generated `dist/` folder to your hosting platform.

## Roadmap Ideas

- Connect chat to a real streaming backend
- Add analytics and conversion tracking
- Add automated accessibility and E2E checks
- Add motion-reduced variants for all animated sections

## License

No license file is currently present. Add a `LICENSE` file to define distribution and usage rights.
