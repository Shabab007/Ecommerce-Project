import React, { createContext, useReducer, useMemo } from "react";

const initialState = {
  products: null,
  categories: null,
  serch: "",
};

const ProductContext = createContext({
  products: null,
  categories: null,
  search: "",
  updateProduct: data => {},
  updateCat: data => {},
  updateSearch: data => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

const ProductProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateProduct = data => {
    dispatch({
      type: "PRODUCT",
      payload: data,
    });
  };

  const updateCat = data => {
    console.log(data);
    dispatch({
      type: "CATEGORY",
      payload: data,
    });
  };
  const updateSearch = data => {
    console.log(data);
    dispatch({
      type: "SEARCH",
      payload: data,
    });
  };
  console.log(state.categories);
  const contextValue = useMemo(
    () => ({
      products: state.products,
      categories: state.categories,
      search: state.search,
      updateProduct,
      updateCat,
      updateSearch,
    }),
    [state.products, state.categories, state.search]
  );
  return <ProductContext.Provider value={contextValue} {...props} />;
};

export { ProductProvider, ProductContext };
