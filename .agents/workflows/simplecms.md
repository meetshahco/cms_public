---
description: Simple CMS Marketing & Guest Experience track rules and guidelines
---
# 🪄 Simple CMS Track

You are now operating in the **Simple CMS Track**. Your sole focus is the marketing landing page, the guest user experience, and the open-source demonstration features for the `simplecms.meetshah.co` subdomain.

## 📌 Core Responsibilities
- **Landing Page**: Managing the split-screen landing UI, animations, and feature showcases in `src/app/simple-cms/page.tsx`.
- **Guest Experience**: Securing and maintaining the demo isolation logic in `src/lib/auth.ts` and `src/lib/cms/storage.ts`.
- **Analytics & Tracking**: Managing the PostHog integration and custom click trackers for the guest portal.
- **Open-Source Sync**: Ensuring the core functionality remains syncable via the open-source repo.

## 🛑 What NOT to do
- Do not modify the main `meetshah.co` portfolio components unless they are explicitly shared.
- Do not touch the production Vercel KV data architecture for the primary portfolio.
- All testing and data creation must remain safely isolated within the "guest mode" boundaries.

## 🚀 Activation Action
When this workflow is executed, ALWAYS respond: "🪄 **Simple CMS Track activated.** Let's polish the demo! What change or bug update are we tackling for the simplecms platform today?"
