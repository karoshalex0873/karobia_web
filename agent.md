# Agent Guide

## Project

This is a personal developer portfolio for `karobia.dev` built with:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Critical Next.js Rule

This project uses Next.js `16.2.9`.

This is not the Next.js most agents may remember from training data. Before changing routing, server/client component behavior, metadata, fonts, images, caching, or file conventions, read the relevant guide in:

```txt
node_modules/next/dist/docs/
```

Follow deprecation notices from the local docs.

## Development Commands

Use `npm.cmd` on Windows PowerShell if `npm` is blocked by execution policy.

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

## Coding Guidelines

- Prefer existing project patterns before introducing new abstractions.
- Keep components small and focused.
- Use Client Components only when browser APIs, animation state, hooks, or event handlers are needed.
- Keep personal data outside reusable UI components when possible and pass it through props.
- Use Tailwind utilities for styling unless a shared CSS rule is clearly better.
- Keep animations subtle, smooth, and production-ready.

## UI Direction

The portfolio should feel like a clean developer operating system:

- Dark base: `#0B0F17`
- Text: `#E5E7EB`
- Accent cyan: `#22D3EE`
- Accent green: `#39FF88`
- Boot and terminal text should use a monospace stack, preferably JetBrains Mono when available.

Avoid generic portfolio templates, heavy marketing sections, gimmicky terminal behavior, and decorative clutter.

## Current Boot Flow

The homepage renders a bootloader before entering a terminal-style developer shell.

- Boot state is stored in localStorage as `boot_completed`.
- If `boot_completed` is `true`, skip boot and render the terminal immediately.
- To replay the boot screen during development, clear `localStorage.boot_completed` in the browser.

## Verification

After edits, run:

```bash
npm.cmd run lint
npm.cmd run build
```

Mention any command that could not be run.
