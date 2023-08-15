const { authenticated, authorized } = require("../Auth/auth");

module.exports = {
  Query: {
    getCats: async (_, __, { Category }) => {
      const cat = await Category.find();
      return cat;
    },

    findCat: async (_, { name }, { Category }) => {
      console.log(name);
      const cat = await Category.find({ name: name }).exec();
      return cat;
    },
  },
  Mutation: {
    createCat: authenticated(async (_, { name }, { Category }) => {
      console.log(name);
      const cat = await Category.find({ name });

      if (cat.length) {
        console.log(cat);
        throw new Error("cat already exist");
      }
      const category = new Category({ name });
      const result = await category.save();
      return result;
    }),
    deleteCat: authenticated(
      authorized(async (_, { id }, { Product, Category }) => {
        const cat = await Category.findByIdAndDelete(id);
        if (cat.product) {
          cat.product.map(async prod => {
            await Product.updateOne(
              { _id: prod.id },
              { $pull: { category: cat.id } }
            );
          });
        }
        return cat;
      })
    ),

    updateCat: authenticated(
      authorized(async (_, { id, name }, { Product, Category }) => {
        const cat = await Category.findByIdAndUpdate(id, { name });
        return cat;
      })
    ),
  },
  Category: {
    products: async ({ id }, _, { Product }) => {
      try {
        const product = await Product.find({ category: id });
        return product;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
