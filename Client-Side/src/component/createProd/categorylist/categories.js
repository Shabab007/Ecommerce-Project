import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CAT } from "../../../Queries/query";
import { ProductContext } from "../../context/productContext";
import Select from "react-select";
const Categories = ({ func, cate }) => {
  const context = useContext(ProductContext);
  const { loading, data } = useQuery(GET_CAT);
  let options = {};
  if (data) {
    console.log(data.getCats);
    options = data.getCats.map(cat => {
      return { value: cat.name, label: cat.name };
    });
  }

  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <select value={cate} defaultValue={"DEFAULT"} onChange={func}>
          <option value="DEFAULT" disabled>
            Choose a Category ...
          </option>
          {data.getCats.map(cat => {
            return (
              <option name={cat.name} key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default Categories;
