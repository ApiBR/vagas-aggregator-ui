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
        currentPage: action.payload.currentPage,
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        pageCount: action.payload.pageCount,
        itemCount: action.payload.itemCount,
        currentPage: action.payload.currentPage,
        lastModified: action.payload.lastModified,
        recentIssues: action.payload.recentIssues,
        mostRecentIssue: action.payload.mostRecentIssue,
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

const BASE_URL = "https://apibr.com/vagas/api/v2/";

/**
 * Custom hook that fetches data from a specified API endpoint using the provided entity and parameters.
 * It manages the loading state and the fetched items, along with pagination information.
 *
 * @param {string} entity - The API endpoint to fetch data from.
 * @param {Object} params - Additional parameters to be sent with the request.
 * @param {number} page - The current page number for pagination.
 * @returns {[Object, function]} An array containing the current state and a function to load the page.
 * 
 * @example
 * const [state, loadPage] = useFetch('users', { active: true }, 1);
 * 
 * // To load the data
 * loadPage();
 *
 * @throws {Error} Throws an error if the request fails, which can be handled in the calling component.
 */
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
            lastModified: res.headers["last-modified"],
            recentIssues: res.headers["x-last-60-days-count"],
            mostRecentIssue: res.headers["x-most-recent-date"],
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
