import { useState, useEffect, useMemo } from "react";

/**
 * Generic hook to filter and paginate a list of items.
 *
 * @template T - Type of each item in the list.
 * @template C - Type of the criteria used for filtering.
 *
 * @param items      - Full list of items to filter.
 * @param filterFn   - Function(item, criteria) → boolean, returns true if item passes the filter.
 * @param criteria   - Current criteria object for filtering.
 * @param pageSize   - Number of items per page.
 *
 * @returns {
 *   filtered: T[],       // Items that pass the filter
 *   current: T[],        // Items on the current page
 *   pageCount: number,   // Total number of pages
 *   pageIndex: number,   // Index of the current page (0-based)
 *   setPageIndex: (n: number) => void
 * }
 */
export function useFilteredPagination<T, C>(
  items: T[],
  filterFn: (item: T, criteria: C) => boolean,
  criteria: C,
  pageSize: number
) {
  // 1) Compute filtered list (recomputed when `items` or `criteria` change)
  const filtered = useMemo(() => {
    return items.filter((item) => filterFn(item, criteria));
  }, [items, criteria, filterFn]);

  // 2) Page index state
  const [pageIndex, setPageIndex] = useState(0);

  // 3) Compute total page count
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  // 4) Reset pageIndex to 0 if it ever exceeds new pageCount
  useEffect(() => {
    if (pageIndex >= pageCount) {
      setPageIndex(0);
    }
  }, [filtered, pageIndex, pageCount]);

  // 5) Compute items on the current page
  const current = useMemo(() => {
    const start = pageIndex * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageIndex, pageSize]);

  return { filtered, current, pageCount, pageIndex, setPageIndex };
}
