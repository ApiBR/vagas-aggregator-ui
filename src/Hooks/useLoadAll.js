import { useState, useEffect, useRef } from "react";
import useFetch from "./useFetch";

export default function useLoadAll(entity, params) {
  const entityRef = useRef(entity);
  const paramsRef = useRef(params);

  const [allPagesLoaded, setAllPagesLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastModified, setLastModfied] = useState(null);

  const [state, loadPage] = useFetch(
    entityRef.current,
    paramsRef.current,
    page
  );

  useEffect(() => {
    loadPage();
  }, [page, loadPage]);

  useEffect(() => {
    if (allPagesLoaded && items.length === state.itemCount) {
      return;
    }

    if (state.items && state.items.length > 0) {

      const currentItems = items;

      if (!allPagesLoaded) {
        currentItems[state.currentPage] = state.items;
        setItems(currentItems);
      }

      const totalItems = allPagesLoaded
        ? currentItems.length
        : currentItems.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.length,
            0
          );

      if (totalItems >= state.itemCount && !allPagesLoaded) {
        setAllPagesLoaded(true);
        setLastModfied(state.lastModified);
        const final = [];
        for (let i in items) {
          items[i].map((ii) => final.push(ii));
        }
        setItems(final);
      }

      if (state.currentPage < state.pageCount && state.currentPage === page) {        
        setPage((page) => page + 1);
      }
    }
  }, [state, loadPage, items, allPagesLoaded, page]);

  return [items, allPagesLoaded, lastModified];
}
