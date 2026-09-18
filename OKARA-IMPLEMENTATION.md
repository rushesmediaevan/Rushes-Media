# SEO and article implementation — September 18, 2026

Problem: the Web title did not identify the service, the Demand Loop summary omitted the framework name, legal pages lacked sharing metadata, and two useful buyer questions lacked detailed articles.

Changes: descriptive Web metadata; clearer Demand Loop summary; accurate legal WebPage and sharing metadata using the existing hero image; two registered articles; a project-oriented article CTA suitable for all categories. Existing URLs, visible service H1s, legal copy, homepage art direction and inquiry code remain unchanged.

Validation under Node 22.23.1: Astro check (0 errors/0 warnings); 41 unit tests passed; production build passed; built contract passed after adding the intentional legal metadata expectations (14 sitemap routes, 19 GA4-tagged public pages); built and development HTTP smoke passed. Both new articles inspected at 390px: one H1 each and no horizontal overflow. The landing-page guide also visually inspected at that width. No production forms submitted.

This branch is a reviewable implementation. It has not been merged or deployed. No ranking or speed improvement is claimed. Shared CSS optimization still needs a measured baseline and its own visual checks. The pre-existing homepage-description PR is separate.

Rollback: revert this implementation commit if released; do not revert unrelated subsequent commits. After publication, verify both article URLs, the article index/sitemap, Web/Demand Loop metadata and privacy/terms sharing images on the live domain.
