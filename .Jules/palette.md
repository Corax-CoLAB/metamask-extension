## 2024-05-22 - Interactive Box Pattern

**Learning:** Many interactive list items (like `ActivityListItem`) use `Box` (div) with `onClick` but lack `role="button"` and full keyboard support (Space key).
**Action:** When identifying `onClick` on generic `Box` components, always ensure `role="button"` (or appropriate role) is added, and `onKeyDown` handles both Enter and Space (with preventDefault).
