const { authenticated, authorized } = require("../Auth/auth");
const { Base64ToString, stringToBase64 } = require("../Helper/helper.js");
const path = require("path");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

const files = [];

module.exports = {
  Query: {
    getProducts: async (_, __, { Product }) => {
      const product = await Product.find();
      return product;
    },

    pagiProducts: async (_, { cursor, limit = 5 }, { Product }) => {
      const query = {};
      if (cursor) {
        query["_id"] = {
          $lt: Base64ToString(cursor),
        };
      }

      let products = await Product.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1);
      const hasNextPage = products.length > limit;
      products = hasNextPage ? products.slice(0, -1) : products;

      return {
        product: products,
        pageInfo: {
          hasNextPage,
          nextPageCursor: hasNextPage
            ? stringToBase64(products[products.length - 1].id)
            : null,
        },
      };
    },

    findProduct: async (_, { id }, { Product }) => {
      const product = await Product.findById(id);
      return product;
    },
  },
  Mutation: {
    createProduct: authenticated(
      authorized(async (_, { input }, { Product, Category }) => {
        console.log(input.category);
        const category = await Category.findOne({
          name: input.category,
        }).exec();
        if (!category) {
          throw new Error("category not found please create first");
        }
        const result = await Product.findOneAndUpdate(
          { name: input.name },
          {
            name: input.name,
            price: input.price,
            brand: input.brand,
            $push: { category: category.id },
          },
          {
            upsert: true,
            new: true,
          }
        ).exec();

        console.log(result);

        // const product = new Product({
        // name: input.name,
        // price: input.price,
        // $push: { categories: category.id },
        // });
        // console.log(product);
        // const result = await product.save();
        // const updateP = await Product.findByIdAndUpdate(
        //   result.id,
        //   { $push: { category: category.id } },
        //   { new: true, useFindAndModify: false }
        // );

        const updated = await Category.findByIdAndUpdate(
          category.id,
          { $push: { product: result.id } },
          { new: true, useFindAndModify: false }
        );
        await updated.save();
        console.log(updated);
        return result;
      })
    ),
    updateProduct: authenticated(
      authorized(async (_, { id, input, category }, { Product, Category }) => {
        console.log(id, input);

        let result = null;
        if (input && category) {
          const cat = await Category.findOne({ name: category }).exec();
          console.log(cat);
          result = await Product.findByIdAndUpdate(
            id,
            {
              ...input,
              $set: { category: cat.id },
            },
            { new: true }
          ).exec();
          console.log(result);
          await cat.product.push(result.id);
          await cat.save();
        } else if (category) {
          const cat = await Category.findOne({ name: category }).exec();
          console.log(cat);
          result = await Product.findByIdAndUpdate(
            id,
            {
              $set: { category: cat.id },
            },
            { new: true }
          ).exec();
          console.log(result);
          await cat.product.push(result.id);
          await cat.save();
        } else {
          result = await Product.findByIdAndUpdate(
            id,
            {
              ...input,
            },
            { new: true }
          ).exec();
          console.log(result);
        }

        return result;
      })
    ),
    deleteProduct: authenticated(
      authorized(async (_, { id }, { Product, Category }) => {
        const prod = await Product.findByIdAndDelete(id);
        console.log(prod);
        prod.category.map(async cat => {
          await Category.updateOne(
            { _id: cat.id },
            { $pull: { product: prod.id } }
          );
        });
        return prod;
      })
    ),
    uploadImage: authenticated(
      authorized(async (_, { file }, { Product }) => {
        console.log("here");
        console.log(file);
        const { createReadStream, filename } = await file;
        console.log(createReadStream);

        await new Promise(resolve, reject =>
          createReadStream()
            .pipe(
              createWriteStream(path.join(__dirname, "../images", filename))
            )
            .on("finish", () => resolve())
            .on("error", reject)
        );
        files.push(filename);
        console.log(files);
        return true;
      })
    ),
  },

  Product: {
    categories: async ({ id }, _, { Category }) => {
      try {
        console.log(id);
        const cats = await Category.find({ product: id });
        console.log(cats.name);
        return cats;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
