

## Add Newsletter Link

Add a Substack newsletter CTA to the home page and chapter reader, alongside the existing book purchase buttons.

### Changes

1. **`src/pages/Index.tsx`** — Add a "Newsletter" button in the hero section's button group, linking to `https://freethinkinggenius.substack.com/s/` with a `Mail` icon from lucide-react.

2. **`src/pages/ChapterReader.tsx`** — Add a matching "Newsletter" button in the footer CTA section alongside the book purchase links.

