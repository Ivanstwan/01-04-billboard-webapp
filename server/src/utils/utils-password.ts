import bcrypt from 'bcrypt';
const saltRounds = 10;

// Function to hash a password
async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

// Function to compare entered password with hashed password
async function comparePasswords(enteredPassword: string, hashedPassword: string) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
}

export { hashPassword, comparePasswords };
