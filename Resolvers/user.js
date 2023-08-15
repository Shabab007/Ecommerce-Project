const { authenticated, authorized } = require("../Auth/auth");
const bcrypt = require("bcryptjs");
const { UserInputError, GraphQLUpload } = require("apollo-server");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../Auth/validate");

module.exports = {
  Query: {
    getUsers: async (_, __, { User }) => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    signUp: async (_, { input }, { User, createToken }) => {
      try {
        console.log(input);
        const existing = await User.findOne({ email: input.email });

        if (existing) {
          throw new Error("User Exists");
        }

        const role =
          input.email === "shabab.23rhythm@gmail.com" ? "ADMIN" : "MEMBER";
        const hashed = await bcrypt.hash(input.password, 12);
        const { valid, errors } = validateRegisterInput(
          input.name,
          input.email,
          input.password,
          input.confirmPassword
        );
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        input.password = hashed;
        const newUser = new User({ ...input, role });
        console.log("======", newUser.password);
        const result = await newUser.save();

        const token = createToken(newUser);
        return { token, user: result };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    signIn: async (_, { input }, { User, createToken }) => {
      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new Error("User not found");
      }
      const token = createToken(user);
      return { token, user };
    },
  },
};
