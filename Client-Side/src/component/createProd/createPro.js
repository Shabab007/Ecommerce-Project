import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import Caregories from "./categorylist/categories";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CAT, CREATE_PROD } from "../../Queries/mutaion";
import { GET_PROD, GET_CAT } from "../../Queries/query";
import Upload from "./upload/upload";
const CreatePro = () => {
  const [cate, setCate] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState("");
  const [state, setState] = useState({
    name: "",
    brand: "",
    price: "",
    category: "DEFAULT",
  });
  const prodInput = ["name", "brand", "price"];

  const [addCat, { error }] = useMutation(CREATE_CAT, {
    variables: { name: cate },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_CAT,
      });
      data.getCats = data.getCats.concat(result.data.createCat);
      proxy.writeQuery({ query: GET_CAT, data });
    },
    onError(err) {
      console.log(err);
    },
  });

  const [addProduct, { loading }] = useMutation(CREATE_PROD, {
    variables: state,
    update(proxy, result) {
      console.log(result);
      const data = proxy.readQuery({
        query: GET_PROD,
      });
      data.getProducts = [result.data.createProduct, ...data.getProducts];
      proxy.writeQuery({ query: GET_PROD, data });
    },
    onError(err) {
      console.log(err);
    },
  });
  const addProd = (e, name) => {
    e.preventDefault();
    console.log(name);
    setShow(show => {
      return (show = true);
    });
    setForm(form => {
      return (form = name);
    });
  };
  console.log(form);
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
  const handleCat = e => {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
    setCate(cate => (cate = value));
  };

  const submitForm = (e, type) => {
    e.preventDefault();
    console.log(type);
    if (type === "Category") {
      addCat();
      setShow(show => (show = false));
      setCate("");
    } else if (type === "product") {
      addProduct();
      setShow(show => (show = false));
    } else {
      throw new Error("fill all the inputs");
    }

    // console.log(e.target.value);
  };

  return (
    <div>
      {show ? (
        form === "product" ? (
          <div>
            <Upload />
            <form
              onSubmit={e => {
                const type = "product";
                submitForm(e, type);
              }}
            >
              {prodInput.map((input, index) => {
                return (
                  <label key={index}>
                    {input}
                    <input
                      key={index}
                      onChange={handleChange}
                      name={input}
                      id={input}
                      placeholder={input}
                    ></input>
                  </label>
                );
              })}

              <Caregories func={handleChange} cate={state.category} />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <form
            onSubmit={e => {
              const type = "Category";
              submitForm(e, type);
            }}
          >
            <label>
              catergory
              <input
                onChange={handleCat}
                name="name"
                placeholder="category name"
              ></input>
            </label>
            <button type="submit">Submit</button>
          </form>
        )
      ) : (
        <Grid>
          <Border>
            <Icon
              name="Product"
              onClick={e => {
                const name = "product";
                addProd(e, name);
              }}
            />

            <p>Add Product</p>
          </Border>
          <Border>
            <Icon
              onClick={e => {
                const name = "category";
                addProd(e, name);
              }}
            />

            <p>Add Category</p>
          </Border>
        </Grid>
      )}
    </div>
  );
};

export default CreatePro;

export const Grid = styled.div`
  margin: 10px auto;
  display: flex;
`;

export const Icon = styled(FaPlusCircle)`
  margin: 10px auto;
  color: purple;
  font-size: 4rem;
  background: white;
  :hover {
    color: blue;
  }
`;

export const Border = styled.div`
  width: 256px;
  margin: 16px auto;
  height: 512px;
  border: 1 px solid grey;
  background: rgb(233, 233, 233);

  transition: 0.5s;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-flow: flex-end;
  justify-content: flex-end;
  align-items: center;
  :hover {
    box-shadow: 1px 1px 15px;
  }
  p {
    font-weight: bold;
    margin: 10px auto;
    background: rgb(233, 233, 233);
  }
`;
