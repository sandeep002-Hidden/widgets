import prisma from "../prisma/prisma.js";
import jwt from "jsonwebtoken";
const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      Email: user.Email,
      UserName: user.UserName,
      FirstName: user.FullName,
      LastName: user.LastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
const generateRefreshToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      success: false;
      message: "No user Exists";
    }
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    await prisma.user.update({
      where: { id: userId },
      data: { Refreshoken: refreshToken },
    });
    return { accessToken, refreshToken, success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const refreshAccessToken = async (oldRefreshToken) => {
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedToken) {
      return { success: false, message: "Login again to continue" };
    }
    const user = await prisma.user.findUnique(decodedToken?.id);
    if (oldRefreshToken !== user?.Refreshoken) {
      return { success: false, message: "Login again to continue" };
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id
    );
    return { accessToken, refreshToken };
  } catch (error) {

      return { success: false, message: error.message };
  }
};
export { refreshAccessToken, generateAccessAndRefreshToken };
