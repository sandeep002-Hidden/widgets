import PostFrame from "../../models/widget.model.js";
export default async function saveWidget(req, res) {
  try {
    const { layoutData, widget } = req.body;
    console.log(req.body);
    const newPost = new PostFrame({
      profilePic: layoutData.profilePic,
      FullName: layoutData.FullName,
      userName: layoutData.userName,
      posts: layoutData.posts,
      widget: widget,
      header: layoutData.header,
      body: layoutData.body,
      boarder: layoutData.boarder,
      layoutHeight: layoutData.widgetSize.layoutHeight,
      layoutWidth: layoutData.widgetSize.layoutWidth,
    });
    await newPost.save();
    return res.status(200).json({
      message: "GetUserData Success fully",
      success: true,
      id: newPost._id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "error in backend",
      message: error.message,
      success: false,
    });
  }
}
