# README 

This is a website for my friend Alix that wanted to showcase her photo's from her time abroad. The purpose is to make her friends travel there as well. She wanted to focus first on aesthetics so that it looks more like a portfolio for her pictures as she wants to put her art forward. 

# the ticker bar fix
## What did it give me the first time?

The first pass at the scrolling city ticker (Hong Kong • Seoul • Tokyo • Sydney • Mount Kinabalu) worked technically — it was a single track with the whole list duplicated back-to-back, sliding with `translateX(0)` → `translateX(-50%)`. On paper that's a normal marquee trick. In practice it looked off: because both copies were glued together in one long strip, it read like the names were repeating/stuttering instead of cleanly cycling, and it didn't loop the way a bar should feel.

## What did I change?

I ripped out the single-track version and rebuilt it as two separate `.ticker-group` blocks sitting side by side inside `.ticker`, each one holding every city exactly once (`css/style.css` lines 85–134, markup in `index.html` lines 15–31 and the same block in every other page). Each group is `min-width: 100%` and `justify-content: space-around`, and both animate with the *same* keyframes at the *same* time — `translateX(0)` to `translateX(-100%)`. Because they start in sync, group 1 slides fully off the left edge at the exact moment group 2 (already queued up right behind it) slides into the spot it just left. That's what makes it loop seamlessly instead of stutter-repeating.

I also had to add one small thing after eyeballing it again: a bullet dot between "Mount Kinabalu" (last item in a group) and "Hong Kong" (first item of the next group), because that seam is visible mid-scroll and without the dot it read as one squished word. That's the `<span aria-hidden="true"> • </span>` tacked onto the end of the Mount Kinabalu link in both groups.

Also kept along the way: DotGothic16 font, pure black text, pause-on-hover, and `prefers-reduced-motion` support — none of that changed, just the loop mechanics underneath it.

## How did I know it needed changing?

Because you told me directly — you said the ticker "isn't looping continuously and repeats the names," and gave me the exact spec for the fix (two `.ticker-group` elements, `flex-shrink: 0`, `min-width: 100%`, `justify-content: space-around`, animate both `0` → `-100%`). That's the whole signal: you looked at what shipped, it didn't match the vision you had for it, and you said so. That feedback is why the change happened and why it's sitting in this commit instead of the first draft.
