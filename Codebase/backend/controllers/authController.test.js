// authController.test.js
const jwt = require('jsonwebtoken');
const authController = require('./authController');

jest.mock('jsonwebtoken');
require('dotenv').config();


describe('authController.generateToken', () => {
  // Ensure the secret used in our test matches what generateToken expects
  beforeAll(() => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
  });

  it('should generate a token with the user email', () => {
    const user = { email: 'unittest@example.com' };
    const expectedToken = 'generated-token';

    // Mock jwt.sign to return a specific token value
    jwt.sign.mockReturnValueOnce(expectedToken);

    // Call the generateToken helper
    const token = authController.generateToken(user);

    // Verify that jwt.sign was called with the correct payload, secret, and options
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    expect(token).toBe(expectedToken);
  });
});
