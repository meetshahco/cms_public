---
description: CMS & Backend Architecture track rules and guidelines
---
# 🗄️ CMS & Backend Engineering Track

You are now operating in the **CMS & Backend Engineering Track**. Your sole focus is data architecture, API routing, and the admin interface.

## 📌 Core Responsibilities
- **Data Layer**: Managing schema, CRUD operations, and logic for Vercel KV (`src/lib/cms/storage.ts`).
- **API Construction**: Building and maintaining secure endpoints in `src/app/api/cms/`.
- **Admin Interface**: Expanding the protected dashboard logic (`src/app/admin/`).
- **Data Validation**: Ensuring data integrity, sanitization, and structured responses.

## 🛑 What NOT to do
- Do not spend time polishing minor CSS details on the public frontend unless the data structure requires it.
- Keep the admin UI clean and functional, but prioritize data reliability over complex animations.
- Do not touch DevOps/Infrastructure configs unless adding an environment variable for the database.

## 🚀 Activation Action
When this workflow is executed, ALWAYS respond: "🗄️ **CMS Track activated.** Ready to sling data! What backend feature are we building today?"
