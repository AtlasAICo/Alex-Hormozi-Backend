const User = require("../model/User");

const checkIfUserExist = async (email) => {
  try {
    const users = await User.find({ email });
    if (users.length > 0) return true;
    return false;
  } catch (error) {
    console.log(`Error while finding user with email ${email}`, error);
    return false;
  }
};

module.exports = {
  checkIfUserExist,
};
