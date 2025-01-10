import prisma from "../../prisma/prisma.js";
import bcrypt from "bcrypt";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../../utills/Cloudniry.js";

export default async function registerUser(req, res) {
  try {
    const { FirstName, LastName, Email, UserName, Password } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (!FirstName || !LastName || !Email || !UserName || !Password) {
      return res
        .status(400)
        .json({ message: "All the fields are required", success: false });
    }
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ Email }, { UserName }] },
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Email or username already exists",
        success: false,
      });
    }
    const profilePic = req.file?.path;
    let profilePicturePath;
    if (profilePic) {
      profilePicturePath = await uploadOnCloudinary(profilePic);
    }
    const user = await prisma.user.create({
      data: {
        FirstName,
        LastName,
        Email,
        UserName,
        Password: await bcrypt.hash(Password, 10),
        ProfilePicture: profilePicturePath.url,
      },
    });

    res.status(201).json({
      message: "Registration successful",
      success: true,
      user: { id: user.id },
    });
  } catch (error) {
    if(profilePicturePath){
      await deleteFromCloudinary(profilePicturePath?.url)
    }
    res.status(500).json({
      error: "Registration failed",
      message: error.message,
      success: false,
    });
  }
}
