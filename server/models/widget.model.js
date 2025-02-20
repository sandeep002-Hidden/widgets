import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: null,
    required: [true, "username is required"],
  },
  commentString: {
    type: String,
    default: null,
  },
  likes: {
    type: Number,
    default: null,
  },
});

const postSchema = new mongoose.Schema({
  images: {
    type: String,
    default: null,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  postText: {
    type: String,
    default: null,
  },
});

const userSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dv65zmain/image/upload/v1730749620/png-transparent-user_vdgdet.png",
  },
  FullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  posts: {
    type: [postSchema],
    default: [],
  },
  widget: {
    type: String,
    enum: ["grid", "slider", "simple"],
    default: "simple",
  },
  header: {
    headerText: {
      type: String,
      default: "",
    },
    headerColour: {
      type: String,
      default: "white",
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  body: {
    bodyColour: {
      type: String,
      default: "white",
    },
  },
  boarder: {
    borderWidth: {
      type: String,
    },
    boarderColour: {
      type: String,
      default: "rgb(110,6,242)",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  layoutHeight: {
    type: String,
    default: "420px",
  },
  layoutWidth: {
    type: String,
    default: "700px",
  },
});

const PostFrame =
  mongoose.models.PostFrame || mongoose.model("PostFrame", userSchema);

export default PostFrame;
