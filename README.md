# Java Backend Lab

Static GitHub Pages course dashboard for the fixed 30-day banking backend curriculum.

## Pages
- `index.html`: all 30 days; Day 1/3 complete but their lesson pages are absent.
- `day-2.html`: exact original detailed Day 2 document from commit `7ea618d`.
- `day-2-reader.html`: navigation wrapper; final-slide finish button; original remains unchanged.
- `day-4.html` through `day-9.html`: standalone detailed lessons.
- `course.css`, `course.js`: shared responsive reading design and browser-local progress.

Day 2 starts in progress, Days 4–9 available/pending, Days 10–30 coming soon. Finish controls save completion in localStorage. No external services, analytics, backend server, or build step are required. Clear/reset progress restores the confirmed Day 1/3 baseline. Script does not alter the preserved Day 2 iframe document.

## Preview
Serve this directory with a static HTTP server, for example `python3 -m http.server 8000`, and open localhost:8000. All links are relative to support GitHub Pages project paths.

## Deployment
Existing GitHub Pages serves this repository. Push changes to its existing publishing branch; `.nojekyll` keeps the site static. Do not replace the original Day 2 file when editing other lessons.

## Lesson examples
Java 21 and Spring Boot 3.5 baseline. Practice code is fictional and in-memory; the pages explain its limits. Code excerpts marked as fragments are not standalone files. Day 8/9 account slices deliberately replace the earlier exercise versions. Later lessons add persistence, transaction safety, security, and consistent error formatting.
