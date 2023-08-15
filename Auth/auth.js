const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const Secret = "Boltcasters";

const getUserFromToken = async token => {
  try {
    console.log("here", token);
    const payload = jwt.verify(token, Secret);

    return await User.findById(payload.id);
  } catch (error) {
    return null;
  }
};

const createToken = ({ id, role }) => {
  return jwt.sign({ id, role }, Secret, { expiresIn: "1d" });
};

const authenticated = next => (root, args, context, info) => {
  console.log("HI", context.userT);
  if (!context.userT) {
    return new Error("user not found");
  }
  return next(root, args, context, info);
};

const authorized = next => (root, args, context, info) => {
  console.log(context.userT);
  if (context.userT.role !== "ADMIN") {
    return new Error("user not Authorized");
  }
  return next(root, args, context, info);
};

module.exports = {
  getUserFromToken,
  createToken,
  authenticated,
  authorized,
};
