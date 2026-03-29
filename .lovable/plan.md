

## Add All Book Purchase Links

Update the home page and chapter reader to show three purchase CTAs: Amazon, Books2Read, and Barnes & Noble (keeping existing), plus OceBook.

### Changes

**`src/pages/Index.tsx`** — Hero section buttons:
- Keep existing "Get the Book" (Books2Read) and "Barnes & Noble" buttons
- Add "Amazon" button linking to `https://a.co/d/c7pVxkb`
- Add "OceBook" button linking to the OceBook URL
- Reorder: Amazon first, then Books2Read, Barnes & Noble, OceBook

**`src/pages/ChapterReader.tsx`** — Footer CTA section:
- Same four purchase buttons with `ExternalLink` icons in a flex-wrap container

