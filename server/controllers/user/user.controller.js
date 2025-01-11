import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";
const getuserdetails = async (req, res) => {
  try {
    const accessToken = req.cookies.StellerForgeAccessToken;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({
        message: "something went wrong, try again after sometime",
        success: flase,
      });
    }
    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "User Found", success: false });
    }
    const sendUser = {
      _id: user.id,
      profilePic: user.ProfilePicture,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      UserName: user.UserName,
    };
    res
      .status(200)
      .json({ message: "get user details", success: true, user: sendUser });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
export { getuserdetails };
