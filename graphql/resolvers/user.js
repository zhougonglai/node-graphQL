const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  users: async () => await User.find(),
  login: async ({email, password}) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, 'secretkey', {
      expiresIn: '1h'
    });
    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    }
  },
  createUser: async ({ userInput }) => {
    const userExist = await User.findOne({ email: userInput.email });
    if (userExist) {
      throw new Error('User exists already.')
    }
    const user = new User({
      email: userInput.email,
      password: await bcrypt.hash(userInput.password, 12)
    })
    return await user.save();
  }
}
