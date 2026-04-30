## Plan

Add a lightweight in-app search so readers can quickly find chapters and passages across the book without introducing any backend dependency.

### What I’ll build

1. **Create searchable content helpers**
   - Extend the book content layer with a search utility that indexes the existing local chapter data.
   - Search across chapter title, description, part title, and body text.
   - Return structured results with:
     - chapter ID and title
     - matching section/part label
     - a short text excerpt/snippet around the match
     - simple relevance ordering so title matches appear first

2. **Add a global search UI**
   - Reuse the existing command/dialog components already in the project to create a polished search modal.
   - Support opening search from:
     - a new Search button in the top navigation
     - keyboard shortcut (`/` and/or `Cmd/Ctrl + K`)
   - Include empty, loading-free, and no-results states.

3. **Connect search results to reading flow**
   - Each result will link directly to the matching chapter.
   - Show enough context in results so users understand why a chapter matched.
   - Keep the UI visually consistent with the project’s current minimal typography and spacing.

4. **Improve discoverability on the course page**
   - Add an inline search entry point on the Course Overview page so users can search from the main reading index as well.
   - Optionally prefill the global dialog input when launched from that page.

5. **Handle usability details**
   - Debounce/filter input lightly in the client for smooth typing.
   - Ignore very short queries until the user types enough characters.
   - Normalize case and punctuation so searches feel forgiving.

### Files likely involved

- `src/data/bookContent.ts` — add reusable search helper(s)
- `src/components/AppNav.tsx` — add search trigger in navigation
- `src/pages/CourseOverview.tsx` — add search entry point near the chapter index
- New component such as `src/components/GlobalSearch.tsx` — search modal and result rendering
- `src/App.tsx` — mount the global search component if needed

### Technical details

- No backend required; this will use the existing local content source.
- I’ll build on top of the existing `cmdk` / dialog UI already present in the codebase.
- Search ranking will prioritize:
  1. title matches
  2. description matches
  3. part matches
  4. body text matches
- Result snippets will be generated from the first relevant body paragraph match to make results more useful than title-only links.

### Outcome

Users will be able to open search from anywhere in the app, type a term like “verification” or “bias,” and jump straight to the relevant chapter with meaningful context.

If you approve, I’ll implement the search modal and wire it into the existing reading experience.