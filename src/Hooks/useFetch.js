import axios from "axios";
import { useReducer, useCallback } from "react";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        items: null,
        currentPage: action.payload.currentPage
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        pageCount: action.payload.pageCount,
        itemCount: action.payload.itemCount,
        currentPage: action.payload.currentPage,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        items: [],
        pageCount: 0,
        itemCount: 0,
        currentPage: 0,
      };
    default:
      return state;
  }
}

const BASE_URL = "https://apibr.com/vagas/api/v1/";

export default function useFetch(entity, params, page) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    items: [],
    pageCount: 0,
    itemCount: 0,
    currentPage: 0,
  });

  const loadPage = useCallback(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST, payload: { currentPage: page } });
    const cancelToken = axios.CancelToken.source();
    axios
      .get(BASE_URL + entity, {
        cancelToken: cancelToken.token,
        params: { page: page, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: {
            items: res.data,
            pageCount: parseInt(res.headers["x-total-pages"]),
            itemCount: parseInt(res.headers["x-total-results"]),
            currentPage: parseInt(res.headers["x-current-page"]),
          },
        });
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
