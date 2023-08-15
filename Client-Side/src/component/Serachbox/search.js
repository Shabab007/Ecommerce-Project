import React, { useContext } from "react";
import { Icon, Label, Input, Sicon } from "./style";
import { ProductContext } from "../context/productContext";

const Search = () => {
  const { updateSearch } = useContext(ProductContext);
  const searchInput = e => {
    const input = e.target;
    console.log(input.value);
    updateSearch(input.value);
  };

  return (
    <Icon>
      <Label>
        <Sicon />
        <Input
          type="search"
          placeholder="Search"
          name="search"
          onChange={searchInput}
        />
      </Label>
    </Icon>
  );
};

export default Search;
