import PostFrame from "../../models/widget.model.js";
export default async function getWidgetDetails(req, res) {
  try {
    console.log("In the get Backend");
    console.log(req.params.id);
    const post = await PostFrame.findOne({ _id: req.params.id });
    console.log(post)
    return res
      .status(201)
      .json(
        { Message: "Get User Data SuccessFully", posts: post, success: true },
  
      );
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "error occure in backend" });
  }
}
