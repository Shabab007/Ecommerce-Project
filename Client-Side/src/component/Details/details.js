import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_PROD, GET_PROD } from "../../Queries/query";
import { AuthContext } from "../context/authContext";
import Categories from "../createProd/categorylist/categories";

import { UPDATE_PROD, DELETE_PROD } from "../../Queries/mutaion";

const Details = ({ Id, history }) => {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    category: "",
  });

  const [click, setClick] = useState(false);
  const { loading, error, data } = useQuery(FIND_PROD, {
    variables: { id: Id },
  });

  const [delProd] = useMutation(DELETE_PROD, {
    variables: { id: Id },
    update(cache, result) {
      const prod = cache.readQuery({ query: GET_PROD });
      const newList = prod.getProducts.filter(t => t.id !== Id);
      cache.writeQuery({
        query: GET_PROD,
        data: { getProducts: newList },
      });
      history.push("/");

      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [updateProd] = useMutation(UPDATE_PROD, {
    variables: state,
    update(result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      const prod = data;
      setState({
        name: prod.findProduct.name,
        price: prod.findProduct.price,
        brand: prod.findProduct.brand,
      });
    }
  }, [data]);

  const handleChange = e => {
    e.preventDefault();

    const value = e.target;
    setState(state => {
      console.log(state);
      value.name = value.name === "" ? "category" : value.name;
      console.log(value.name);
      return { ...state, [value.name]: value.value };
    });
  };

  const submitForm = e => {
    e.preventDefault();

    setState((state.id = Id));
    updateProd();
    setClick(false);

    // console.log(e.target.value);
  };

  const handleClick = e => {
    setClick(true);
  };

  const showWrap = loading ? (
    <h1>loading...</h1>
  ) : error ? (
    <h1>error...</h1>
  ) : click && data ? (
    <>
      <button onClick={() => setClick(false)}>back</button>
      <form onSubmit={submitForm}>
        <label>
          Name:
          <input
            name="name"
            onChange={handleChange}
            placeholder={data.findProduct.name}
          />
        </label>
        <label>
          Price:
          <input
            name="price"
            onChange={handleChange}
            placeholder={data.findProduct.price}
          />
        </label>
        <label>
          Brand:
          <input
            name="brand"
            onChange={handleChange}
            placeholder={data.findProduct.brand}
          />
        </label>
        <Categories func={handleChange} />
        <button>Submit</button>
      </form>
    </>
  ) : data ? (
    <div>
      <h1>Name:{data.findProduct.name}</h1>
      <h2>Brand:{data.findProduct.brand}</h2>
      <p>Price:${data.findProduct.price}</p>
      {user ? (
        user.user.role === "ADMIN" ? (
          <>
            <button onClick={handleClick}>edit Product</button>
            <button onClick={() => delProd()}>Delele</button>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {data.findProduct.categories.map(cat => {
        return (
          <div key={cat.id}>
            <h1>
              Category
              <br />
              {cat.name}
            </h1>

            <h2> Related Products</h2>
            {cat.products.map(prod => {
              if (prod.id !== data.findProduct.id) {
                return (
                  <div key={prod.id}>
                    <p>Name:{prod.name}</p>
                    <p>Brand{prod.brand}</p>
                    <p>Price:${prod.price}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  ) : (
    <p>bye</p>
  );

  return showWrap;
};

export default Details;
