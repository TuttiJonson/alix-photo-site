# Alix Abroad: Product Requirements Document

## 1. Product Summary

**Alix Abroad** is an interactive photography archive documenting Alix's time abroad. Visitors explore five destinations through a colorful puzzle-inspired homepage, open individual trip pages, and read a short personal introduction alongside a curated gallery.

The experience should feel like a colorful travel journal: Swiss editorial design, analog disposable-camera character, and playful modernism. The photography remains the visual focus.

## 2. Goals

- Create a beautiful, memorable archive of Alix's photographs from her exchange.
- Give friends, family, and other people from the exchange an enjoyable way to explore her memories.
- Encourage visitors to discover all five trips through the homepage puzzle.
- Make the site easy for Alix to share with others.
- Deliver the first public version by the end of the week.

## 3. Non-Goals

- No content management system or admin dashboard.
- No analytics or visitor tracking.
- No photo lightbox, fullscreen viewer, captions, or gallery controls.
- No LinkedIn link, email contact form, or complex contact workflow.
- No personal portrait of Alix.
- No separate destination links in the main navigation.

## 4. Audience

Primary visitors are:

- Alix's friends and family.
- People she met during her exchange.
- Anyone who receives the site link from Alix or someone in her network.

The site should work equally well on desktop and mobile.

## 5. Information Architecture

### Global navigation

The navigation bar is present across the site and remains visible while scrolling.

- **Alix Abroad**: site title and link to the homepage.
- **About Me**: dedicated About page.
- **Contact**: dedicated Contact page.

The five destinations are reached through the clickable photo pieces on the homepage.

### Routes

- `/`: Homepage puzzle.
- `/hong-kong`: Hong Kong trip page.
- `/tokyo`: Tokyo trip page.
- `/seoul`: Seoul trip page.
- `/mount-kinabalu`: Mount Kinabalu trip page.
- `/sydney`: Sydney trip page.
- `/about`: About Me page.
- `/contact`: Contact page.

## 6. Homepage Requirements

### Layout

The homepage contains exactly 12 pieces:

- 5 clickable photo pieces, one for each destination.
- 7 decorative pieces with AI-generated words or short phrases inspired by Alix's time abroad.

On desktop:

- The puzzle uses irregular, interlocking rectangular pieces.
- Pieces vary in size and read as a colorful puzzle rather than a conventional grid.
- The complete puzzle must fit within the first viewport beneath the header.
- The page should not require vertical scrolling to see the full puzzle.

On mobile:

- The puzzle becomes a responsive two-column mosaic.
- Selected pieces may span both columns instead of shrinking the desktop arrangement.
- The overall puzzle should be reduced in scale so it does not feel overwhelming.
- Vertical scrolling is acceptable.
- All five photo links, colors, and decorative labels must remain available.

### Photo pieces

- Each photo piece links to its destination page.
- Photos may be cropped to fit the puzzle-piece shapes.
- The destination name and `VIEW ->` prompt appear on desktop hover.
- The photo receives a subtle zoom on hover.
- On mobile, one tap opens the trip page immediately. The destination name may already be visible or appear briefly as part of the interaction, but navigation must not require a second tap.
- The seven decorative pieces remain static and are not clickable.

### Decorative pieces

- Each piece uses a different color.
- Labels are a deliberate mix of single words and short phrases.
- One piece contains a longer reflective quote in a contrasting serif style.
- Labels and the longer quote are AI-generated for the initial version.
- Decorative pieces should not compete visually with the photography.

## 7. Trip Page Requirements

There are five trip pages using one shared template:

- Hong Kong
- Tokyo
- Seoul
- Mount Kinabalu, Malaysia
- Sydney

### Desktop layout

- A solid color panel sits beside a large hero photograph.
- The panel color matches the corresponding homepage puzzle piece.
- The panel contains the destination name and a very short personal introduction.
- The hero photograph is displayed beside the panel.
- A vertical gallery follows below the hero section.

### Mobile layout

- The solid color panel appears above the hero photograph.
- The vertical gallery follows the hero section.
- The layout must remain readable and avoid excessive visual density.

### Content

- Each trip includes approximately 4 to 5 photographs.
- The gallery is image-only with no captions or location labels.
- Any order is acceptable; a curated sequence is not required.
- The photos do not open into a lightbox or other expanded viewer.
- The trip introduction is one to two short paragraphs in a personal, introductory editorial tone.
- The introduction focuses on how Alix felt about the trip.
- Travel dates are not displayed.
- Only the destination name is used as the trip identifier.

### Navigation

- The global navigation remains visible while scrolling.
- The bottom of every trip page includes a `Go Back to the Page` control that returns to the homepage.
- The site title in the header also returns to the homepage.

## 8. About Me Page Requirements

The About Me page is text-led and includes:

- Alix's story about her love of movies and film.
- The Instagram accounts that influenced her interest in photography.
- The secondhand camera she bought at a market stall in Hong Kong.
- Facts about her exchange.
- The camera make and model.
- A photograph of the camera she used.

The page must not include a personal photograph of Alix.

On desktop, the camera photograph sits beside the About Me text. On mobile, the camera photograph appears above the text.

The primary About Me title uses the split-flap or airport departure-board visual treatment, built with CSS. Condensed sans-serif lettering may be used inside the tile treatment.

## 9. Contact Page Requirements

The Contact page is minimal and contains:

- Alix's preferred display name.
- Her Instagram handle as an external link.

No LinkedIn link, email address, contact form, or additional contact workflow is included.

The Instagram link opens in a new browser tab.

## 10. Visual Design

### Design direction

Swiss editorial + analog travel journal + playful modernism.

The design should use generous breathing room, large photographs, minimal text, and restrained interaction effects. Avoid heavy buttons, borders, shadows, gradients, and unnecessary decorative elements.

### Palette

Use the approved palette, with colors distributed intentionally rather than equally:

- Dusty pink: `#E9A0A6`
- Butter yellow: `#F2E534`
- Grass green: `#3A9949`
- Powder blue: `#79ADD0`
- Warm orange: `#F98A2B`
- Cream: `#E9E3D2`
- Warm brown: `#9A6842`
- Near-black: `#171717`
- Background white: `#F8F8F5`

Pink, cream, yellow, and blue can dominate. Green, orange, and brown should be used more sparingly. The palette should feel slightly softened and modernist rather than aggressively primary or saturated.

### Typography

- Main branding and editorial labels use a clean, light Swiss-style sans-serif with generous tracking.
- Small labels use uppercase text, approximately `11px`, with `0.18em` letter spacing.
- The `ABOUT ME / ALIX ABROAD` title uses a CSS split-flap treatment with black tiles, a horizontal split line, spacing, and condensed lettering.
- Suitable condensed type directions include Barlow Condensed, DIN Condensed, Helvetica Neue Condensed, or a similar available font.
- The main editorial type may use a clean sans-serif such as Inter, Neue Haas Grotesk, Helvetica Neue, Suisse Int'l, or Arial/Helvetica.
- The longer homepage quote uses an italic serif such as Cormorant Garamond, EB Garamond, or Times New Roman italic.

## 11. Accessibility and Interaction

- All interactive photo pieces must be keyboard-focusable and operable as links.
- Destination names must be available to assistive technology even when visually revealed on hover.
- Images should use minimal descriptive accessibility labels because the galleries are primarily visual memories.
- The design should maintain readable contrast between text and colored panels.
- Do not add extra interaction to gallery images.
- Keep the agreed hover and tap behavior lightweight and predictable.

## 12. Content and Asset Requirements

All final assets are expected to be available for the initial launch:

- One hero photograph for each of the five destinations.
- Three homepage photo candidates for each of the five destinations, with one selected for final use.
- Approximately 4 to 5 gallery photographs per destination.
- Camera photograph for the About Me page.
- Camera make and model.
- About Me text.
- One to two short trip introductions per destination.
- Alix's display name.
- Instagram handle.
- AI-generated decorative words, phrases, and reflective quote.

Alix has confirmed that the photographs may be published publicly on the open web.

## 13. Content Management

Updates will be made manually in the website files. No self-service editing interface is required.

## 14. Hosting and Launch

- Deploy using GitHub Pages for this project repository.
- Use the repository's project URL rather than replacing the main `TuttiJonson.github.io` site.
- Target launch: end of the week.
- Final approval is provided by the project owner before launch.
- The site is analytics-free.
- The default social and messaging link preview is sufficient; custom social preview metadata is not required.

## 15. Acceptance Criteria

The first version is ready for approval when:

- The homepage contains exactly 12 pieces: 5 clickable photo pieces and 7 static decorative pieces.
- All five destinations are represented and link to working trip pages.
- The desktop homepage puzzle is fully visible beneath the header without vertical scrolling.
- The mobile homepage uses a two-column responsive mosaic with selected pieces spanning both columns and remains visually manageable.
- Desktop photo hover reveals the destination name and `VIEW ->` prompt with a subtle zoom.
- Mobile photo interaction uses one tap and opens the trip page immediately.
- Each trip page follows the shared template and contains 4 to 5 image-only gallery photos.
- Each trip page uses the matching homepage piece color for its solid panel.
- Each trip page includes a short personal introduction and a `Go Back to the Page` control.
- The About Me page includes the camera photo and requested story content, with no portrait of Alix.
- The Contact page is minimal and includes only the display name and Instagram handle.
- The navigation remains visible while scrolling, and the `Alix Abroad` title returns to Home.
- The site works on desktop and mobile.
- No analytics, lightbox, captions, LinkedIn link, or CMS is present.
- The site is publicly deployed through the project's GitHub Pages URL by the end of the week.
