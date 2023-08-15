import { GET_CART, GET_PROD } from "../Queries/query";

export const resolvers = {
  Mutation: {
    addItemToCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART });
      const { getProducts } = cache.readQuery({ query: GET_PROD });
      const newItem = getProducts.find(item => item.id === args.id);
      // console.log(newItem.qty);
      // console.log(cart.item.indexOf(newItem));
      cache.writeQuery({
        query: GET_CART,
        data: {
          cart: {
            item: helper(cart.item, newItem),
            totalPrice: priceHelper(cart.item),
            quantity: cart.quantity + 1,
            __typename: "Cart",
          },
        },
      });
    },
    counterItems: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART });
      const { getProducts } = cache.readQuery({ query: GET_PROD });
      const newItem = getProducts.find(item => item.id === args.id);

      cache.writeQuery({
        query: GET_CART,
        data: {
          cart: {
            item: helperQty(cart.item, newItem, args.qty),
            totalPrice: priceHelper(cart.item),
            quantity: cart.quantity + 1,
            __typename: "Cart",
          },
        },
      });
    },
    removeItem: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: GET_CART });
      const { getProducts } = cache.readQuery({ query: GET_PROD });
      const newItem = getProducts.find(item => item.id === args.id);

      cache.writeQuery({
        query: GET_CART,
        data: {
          cart: {
            item: remove(cart.item, newItem),
            totalPrice: priceHelper(cart.item),
            quantity: cart.quantity + 1,
            __typename: "Cart",
          },
        },
      });
    },
  },
};

const priceHelper = item => {
  console.log(item);
  let price = 0;
  for (let i = 0; i < item.length; i++) {
    price = price + item[i].qty * Number(item[i].price);
    console.log(price);
  }
  return price;
};

const helper = (item, newItem) => {
  if (item.length) {
    for (let i = 0; i < item.length; i++) {
      if (item[i].id === newItem.id) {
        // console.log(true);
        let prod = item[i];
        prod.qty++;
        // console.log(prod);
        return item;
      } else if (i === item.length - 1) {
        console.log(false);
        newItem.qty = 1;
        return item.concat(newItem);
      }
    }
  } else {
    newItem.qty = 1;
    return item.concat(newItem);
  }
};

const helperQty = (item, newItem, aqty) => {
  for (let i = 0; i < item.length; i++) {
    if (item[i].id === newItem.id) {
      item[i].qty = aqty;
      return item;
    }
  }
};

const remove = (item, newItem) => {
  for (let i = 0; i < item.length; i++) {
    if (item[i].id === newItem.id) {
      // console.log(true);

      item.splice(i, 1);
      return item;
    }
  }
};
