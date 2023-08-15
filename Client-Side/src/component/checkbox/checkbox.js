import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CAT } from "../../Queries/query";
import { ProductContext } from "../context/productContext";
import { Check, Label, Grid, Section } from "./style";

const Checkbox = () => {
  const { updateCat } = useContext(ProductContext);
  // console.log(products);
  const [cats, setCat] = useState([]);
  const { loading, data } = useQuery(GET_CAT);
  if (data) {
    console.log(data.getCats);
  }

  const handleChange = e => {
    // console.log(e.target.checked);
    let event = e.target;
    let array = [...cats];
    const index = array.indexOf(event.value);
    // console.log(index);
    if (event.checked === true) {
      if (index === -1) {
        array.push(event.value);
      }
    } else {
      array.splice(index, 1);
    }
    setCat(array);
    console.log(cats);
    const newPro = findProductbyCat(array);
    // console.log(newPro);
    updateCat(newPro);
  };
  // console.log(cats);

  const findProductbyCat = array => {
    return data.getCats.filter(cat => {
      return array.includes(cat.name);
    });
    // console.log(products.product);
    // return products.getProducts.filter(product => {
    //   // console.log(product);

    //   return product.categories.filter(cat => {
    //     //   console.log(cat.name);
    //     //   console.log(cat.name === array);
    //     return array.includes(cat.name);
    //   });
    // });
  };

  return (
    <Section>
      <h1>Categories</h1>
      <Grid>
        {loading ? (
          <p>loading...</p>
        ) : (
          data.getCats.map(cat => {
            return (
              <Label key={cat.id}>
                <Check
                  type="checkbox"
                  name={cat.name}
                  value={cat.name}
                  key={cat.id}
                  onChange={handleChange}
                />
                {cat.name}
              </Label>
            );
          })
        )}
      </Grid>
    </Section>
  );
};

export default Checkbox;
