# Article publishing through GitHub

Repository: `rushesmediaevan/Rushes-Media`. Hosting: the existing Railway service builds the main branch. A file or pull request in GitHub is not proof of a live article; verify the successful deployment and public URL after merging.

## Prepared first release

- `/articles/` lists registered guides.
- `/articles/hiring-a-google-ads-agency/` is the corrected first article.
- Homepage and service footers link to Articles.
- Markdown uses the shared layout, canonical metadata, organization authorship, Article JSON-LD and site typography. No new CMS, plugin or third-party script.
- The registry feeds the index and sitemap contract. Existing build and smoke checks cover every registered article.

## Future Okara drafts

Ask Okara to create a review-only pull request in this repository, if its connected publisher supports the required files. Do not assume an account connection confirms its selected repository, branch, output folder or format; check the first PR before using it as a repeatable workflow.

For each article:

1. Add `src/pages/articles/<slug>.md` with frontmatter containing `layout: ../../layouts/ArticleLayout.astro` and `slug: <slug>`.
2. Add matching `slug`, `title`, `description`, and `category` fields in `scripts/article-routes.mjs`.
3. Use H2 sections in the body; the layout supplies the only H1 and the Growth Call CTA. Use relative links to existing service pages. No raw embedded scripts, tracking widgets, unsupported statistics, fabricated first-person experiences, or unverified source links.
4. Codex reviews the complete text and PR diff. Verify claims against primary sources, working links, metadata, mobile layout, and that the article adds depth beyond existing pages. If Okara can only export a generic Markdown file, Codex adapts it to these two files.
5. Run `npm test` on Node 22 in an isolated checkout. Check the article locally before publishing. Main-branch merge requires Evan's release authority; do not enable auto-merge or let Okara write directly to main.
6. After approval: commit the reviewed source, integrate without overwriting other work, push main, wait for Railway success, and verify article, index, sitemap and core pages on production.

Do not give a future article a publication date before it is published. This initial layout omits publication dates rather than inventing a release timestamp. Organization authorship avoids falsely presenting generated content as personally authored or reviewed by Evan.

## Editorial corrections to Okara's first draft

The original remains in the user attachment. This version removes the unusable Reddit URL, unsupported generalizations about agencies, claims that original visuals consistently outperform stock, arbitrary account-manager capacity and contract-length thresholds, and unsupported one-hour conversion claims. It corrects the Google Ads ownership/history statement using Google's documentation. It preserves the practical buyer checklist and broad-company positioning.

No LinkedIn drafts, GEO completed-run evidence, or the promised complete existing-article review appeared in the pasted response. Those deliverables remain outstanding; do not record them as completed.
