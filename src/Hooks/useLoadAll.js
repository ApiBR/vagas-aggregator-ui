import { useState, useEffect, useRef } from "react";
import  useFetch from "./useFetch";

export default function useLoadAll(entity, params) {
  const entityRef = useRef(entity);
  const paramsRef = useRef(params);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [state, loadPage] = useFetch(entityRef.current, paramsRef.current, page);

  useEffect(() => {
    if(state.loading)
      return;    
    if(state.items.length > 0){
      setItems(items => [...items, ...state.items]);
    }
    if(page === 1 || state.hasMorePages){
      loadPage();  
      setPage(page + 1);
    }
  }, [page, state, loadPage]);

  return items;
};
