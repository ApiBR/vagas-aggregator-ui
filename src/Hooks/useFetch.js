import axios from "axios";
import { useReducer, useCallback } from "react";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, items: [], pageCount: 0, itemCount: 0 };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, items: action.payload.items, pageCount: action.payload.pageCount, itemCount: action.payload.itemCount };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
        pageCount: 0,
        itemCount: 0
      };
    default:
      return state;
  }
}

const BASE_URL = "https://apibr.com/vagas/api/v1/";

export default function useFetch(entity, params, page) {
  const [state, dispatch] = useReducer(reducer, { items: [], pageCount:0, itemCount: 0, loading: false });

  const loadPage =  useCallback(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL + entity, {
        cancelToken: cancelToken.token,
        params: { page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { items: res.data, pageCount: res.headers["x-total-pages"], itemCount: res.headers["x-total-results"] } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [entity, params, page]);

  return [state, loadPage];
}
