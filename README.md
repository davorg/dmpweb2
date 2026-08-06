# datamungingwithperl.com

Source for the single-page website for *Data Munging with Perl*
(2nd edition), live (currently unlinked) at
[new.datamungingwithperl.com](https://new.datamungingwithperl.com/).

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

## Structure

* `docs/index.html` — the whole page.
* `docs/css/style.css` — compiled stylesheet (edit directly; no SCSS source any more).
* `docs/js/theme.js` — page behaviour (carousels, smooth-scroll nav, etc).
* `docs/images/` — images used on the page.
* `docs/plugins/` — third-party JS/CSS (Bootstrap, jQuery, Slick Carousel, etc.), from the original template.
* `docs/blog-single.html` — template leftover for a single blog post view; not currently linked to real content.
