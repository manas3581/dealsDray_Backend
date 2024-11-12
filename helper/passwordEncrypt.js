import bcrypt from "bcrypt";

export const adminPasswordHash = async (password) => {
  try {
    const newPassword = await bcrypt.hash(password, 10);

    return newPassword;
  } catch (e) {
    throw new Error("Password hashing failed");
  }
};

export const adminPasswordVerify = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Password verification failed");
  }
};
