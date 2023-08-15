import React from "react";
import Details from "../component/Details/details";

const ProductDteails = props => {
  console.log(props.match.params.productId);

  return <Details Id={props.match.params.productId} history={props.history} />;
};

export default ProductDteails;
