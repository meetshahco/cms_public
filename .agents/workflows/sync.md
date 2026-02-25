---
description: Sync the private portfolio with the public standalone CMS repo.
---

This workflow sanitizes the codebase and pushes the latest CMS updates to the public repository.

1. Ensure all your changes are committed to the `main` branch.
// turbo
2. Run the sync script:
```bash
npm run sync-public
```
3. Verify the public repo on GitHub at [meetshahco/cms_public](https://github.com/meetshahco/cms_public).
