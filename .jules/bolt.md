## 2026-01-29 - React.memo() triggering snapshot role attributes
**Learning:** Wrapping components in `React.memo()` in this codebase caused unit test snapshots to generate `role="button"` attributes on list items. This behavior is unexpected as `React.memo` should be transparent to props, but may affect how `ActivityListItem` (using `Box`) or the test renderer infers roles, possibly due to `displayName` or component type changes.
**Action:** When memoizing components, always inspect snapshot diffs carefully. If `role="button"` appears unexpectedly, verify it doesn't break accessibility or functionality, and update snapshots if the behavior is acceptable.

## 2026-02-04 - Fuse.js instantiation in Render Loop
**Learning:** `Fuse.js` instantiation is expensive (indexing). Several components instantiated `new Fuse()` inside the render body (or inside a helper function called during render) without memoization. This causes significant performance overhead on every re-render, especially with large lists like networks.
**Action:** Always memoize `Fuse` search results or the `Fuse` instance itself using `useMemo`. If possible, move the search function/instantiation outside the component if it doesn't depend on component scope (or pass dependencies as arguments).
