# Team project website

Static project presentation for **Monitoring dostupnosti zdravotnej starostlivosti** (FEI STU). The site uses HTML, CSS, and browser JavaScript; no dependency installation, build command, or backend is required.

## Publish on GitHub Pages

1. Commit and push the site files to the `main` branch of `AlexImrisek/team-project-website`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the **main** branch and **/(root)** folder, then **Save**.
5. Wait for the Pages deployment in the **Actions** tab to finish.

The expected address for this repository is:

<https://aleximrisek.github.io/team-project-website/>

Use the address shown in **Settings → Pages** if a custom domain is configured. GitHub's [publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) describes these settings.

Keep `index.html`, `styles.css`, `script.js`, `.nojekyll`, `assets/`, and `docs/` together in the publishing root. The `docs/` folder contains downloadable project documents; it is **not** the Pages publishing folder. The `.nojekyll` file tells GitHub Pages to serve the files directly, including the original Markdown downloads.

Asset and document URLs are relative so the site works under the repository path as well as on a `username.github.io` root site. Filenames and their capitalization must match exactly.

## Local preview

Open `index.html` in a browser. A local HTTP server can also serve the repository root; no build step is needed.

Check the waiting-time/fee tabs, mobile navigation, work-plan sections, and document downloads. The chart contains illustrative data; the REST API and database mentioned in the project plan are future project work and are not part of this presentation site.
