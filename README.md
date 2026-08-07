# datamungingwithperl.com

Source for the single-page website for *Data Munging with Perl*
(2nd edition), live at
[datamungingwithperl.com](https://datamungingwithperl.com/).

## How this works

The site is a single static HTML page: `docs/index.html`. There is no
build step — edit that file directly and commit. `docs/CNAME` sets the
custom domain; the site is served via GitHub Pages from the `docs/`
folder of this repo.

The page started from the [Themefisher "Influencer"](https://github.com/themefisher/influencer)
Bootstrap template (see `LICENSE` for the template's original MIT
licence, which still applies to the reused CSS/JS/plugins in
`docs/plugins` and `docs/css`). The template's own `gulp`/SCSS source
build was dropped (2026-08-06) since the site had already been
maintained by hand-editing `docs/index.html` directly for some time,
making the build pipeline dead weight.

**One deliberate exception:** the "Latest Updates" section on the
homepage is generated, not hand-edited — see below.

## Structure

* `docs/index.html` — the whole page. Hand-edit this directly, except
  for the content between `<!-- updates:start -->` and
  `<!-- updates:end -->`, which is overwritten by `bin/build-updates`
  (see "Updating the Latest Updates section").
* `docs/css/style.css` — compiled stylesheet (edit directly; no SCSS source any more).
* `docs/js/theme.js` — page behaviour (carousels, smooth-scroll nav, etc).
* `docs/images/` — images used on the page.
* `docs/plugins/` — third-party JS/CSS (Bootstrap, jQuery, Slick Carousel, etc.), from the original template.
* `docs/blog-single.html` — template leftover for a single blog post view; not currently linked to real content.
* `data/updates.yaml` — source content for the "Latest Updates" section.
* `bin/build-updates` — Perl script that renders `data/updates.yaml` into HTML and splices it into `docs/index.html`.

## Updating the "Latest Updates" section

This used to be client-side JS fetching a JSON file, but that turned
out to be a bad idea twice over: editing the JSON did nothing until
the next GitHub Pages deploy anyway, and the content was invisible to
search/LLM crawlers until then too, since they don't run JS. It's now
generated at commit time instead, so the HTML that ships already has
the content in it.

To add an update:

1. Add an entry to `data/updates.yaml` (date, title, a list of
   paragraphs — see the comments at the top of that file).
2. Commit and push. A GitHub Actions workflow
   (`.github/workflows/build-updates.yml`) runs `bin/build-updates`
   automatically whenever `data/updates.yaml` changes on `main`, and
   commits the regenerated `docs/index.html` back.

You can also run `bin/build-updates` locally (needs `YAML::PP` from
CPAN) if you want to check the result before pushing, or if you've
changed the template in the script itself rather than the data — in
that case, trigger the workflow manually from the Actions tab instead
of via a `data/updates.yaml` change.
