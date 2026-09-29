# README 

This is a website for my friend Alix that wanted to showcase her photo's from her time abroad. The purpose is to make her friends travel there as well. She wanted to focus first on aesthetics so that it looks more like a portfolio for her pictures as she wants to put her art forward. She also wants to drive movement towards her platform and see if anyone would have an interest in actually purchasing the images that she created, or even interested in her taking pictures during some trips 

live website URL: tuttijonson.github.io/alix-photo-site/

## AI Output I Did Not Accept As-Is

### What the AI gave me

I asked Claude Code to fix my header logo. On `tokyo.html` the globe image rendered at full size and covered the header, and on `index.html` and `about.html` it didn't appear at all.

Claude Code produced commit **`6b621e0`** (`git show 6b621e0`). It:

- added `favicon.png` and linked it in the `<head>` of all 9 HTML pages
- replaced the header text link with an image-only logo, on every page:

```diff
-<a href="index.html" class="site-title">Alix Abroad</a>
+<a href="index.html" class="site-logo"><img src="favicon.png" alt="Alix Abroad — home"></a>
```

- replaced `.site-title` in `css/style.css` with `.site-logo` rules that cap the image at 36px tall (28px under 767px) and add a hover/focus fade

That fixed the oversized globe and made the header identical on every page.

### What I changed, and how I knew

Reading the diff and checking the pages in the browser, I saw that the commit had **deleted the "Alix Abroad" text**. My design needed the logo *next to* the text, as one clickable link home, with the text sitting slightly above the logo's center. The commit's red line (`-<a ... class="site-title">Alix Abroad</a>`) showed the wordmark was gone, so I didn't accept it.

I wrote a more specific follow-up prompt and Claude Code produced commit **`feee172`** (`git show feee172`). It:

- wraps the image and a `<span class="site-logo-text">Alix Abroad</span>` in the same `<a class="site-logo">` on all 9 pages
- changes the image `alt` to empty, since the visible text now names the link
- sets `.site-logo` to `display: flex; align-items: center; gap: 10px; flex-shrink: 0`
- restores the old title styling on `.site-logo-text` and adds `white-space: nowrap; position: relative; top: -2px` to nudge the text up

### How I verified it

My prompt asked Claude Code to check before committing, and it reported that:

- the header container was already `display: flex; justify-content: space-between; padding: 0 28px`, so the logo sits flush

